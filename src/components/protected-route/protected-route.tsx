import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../services/types";

interface IProtectedProps {
  onlyUnAuth?: boolean;
  component: JSX.Element;
}

interface IOnlyUnAuthProps {
  component: JSX.Element;
}

const Protected = ({ onlyUnAuth = false, component }: IProtectedProps) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelector((store: RootState) => store.userInfo.isAuthChecked);
  const user = useSelector((store: RootState) => store.userInfo.firstname);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Здесь возвращается просто null для экономии времени
    return null;
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: IOnlyUnAuthProps) => (
  <Protected onlyUnAuth={true} component={component} />
);

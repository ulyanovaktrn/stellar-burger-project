import {
  ConstructorPage,
  Feed,
  NotFound404,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Location,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { TFromLocation } from '../../utils/types';

const App = () => {
  const location: Location<TFromLocation> = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='login' element={<ProtectedRoute children={<Login />} />} />
        <Route
          path='register'
          element={<ProtectedRoute children={<Register />} />}
        />
        <Route
          path='forgot-password'
          element={<ProtectedRoute children={<ForgotPassword />} />}
        />
        <Route
          path='reset-password'
          element={<ProtectedRoute children={<ResetPassword />} />}
        />
        <Route
          path='profile'
          element={<ProtectedRoute children={<Profile />} />}
        >
          <Route
            path='profile/orders'
            element={<ProtectedRoute children={<ProfileOrders />} />}
          />
        </Route>
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute
              children={
                <Modal
                  title={'Информация заказа'}
                  onClose={() => navigate('/')}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингридиената'}
                onClose={() => navigate('/')}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Информация заказа'} onClose={() => navigate('/')}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

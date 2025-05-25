import { useEffect } from 'react';
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
import { IngredientsActions, UserActions } from '@slices';
import { useDispatch } from '../../services/store';
import '../../index.css';
import styles from './app.module.css';
import {
  Location,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useMatch
} from 'react-router-dom';
import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import { ProtectedRoute } from '@components';
import { TFromLocation } from '../../utils/types';

const App = () => {
  const location: Location<TFromLocation> = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feedNum = useMatch('/feed/:number')?.params.number;
  const profileOrderNum = useMatch('/profile/orders/:number')?.params.number;
  const orderNum = feedNum || profileOrderNum;

  useEffect(() => {
    dispatch(IngredientsActions.getIngredientsThunk());
    dispatch(UserActions.getUserThunk()).finally(() => {
      dispatch(UserActions.authCheck());
    });
  }, []);

  const handleModalClose = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute withoutAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute withoutAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute withoutAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute withoutAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингридиената'} onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${orderNum}`}
                onClose={handleModalClose}
                titleClassName='text_type_digits-default'
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={`#${orderNum}`}
                  onClose={handleModalClose}
                  titleClassName='text_type_digits-default'
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

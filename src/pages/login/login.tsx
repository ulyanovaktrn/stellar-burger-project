import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { UserActions } from '@slices';
import { UserSelectors } from '@selectors';
import { useDispatch, useSelector } from '../../services/store';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const err = useSelector(UserSelectors.selectError);
  const isLoading = useSelector(UserSelectors.selectIsLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrMsg('Fill up all the required fields');
      return;
    }
    setErrMsg(null);
    dispatch(UserActions.getLoginUserThunk({ email, password }))
      .unwrap()
      .catch(() => setErrMsg(err));
  };

  return (
    <LoginUI
      errorText={errMsg || ''}
      isLoading={isLoading}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

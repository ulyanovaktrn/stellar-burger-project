import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { UserActions } from '@slices';
import { UserSelectors } from '@selectors';
import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const err = useSelector(UserSelectors.selectError);
  const isLoading = useSelector(UserSelectors.selectIsLoading);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !userName || !password) {
      setErrMsg('Fill up all the required fields');
      return;
    }
    setErrMsg(null);
    dispatch(
      UserActions.getRegisterUserThunk({ email, name: userName, password })
    )
      .unwrap()
      .catch(() => setErrMsg(err));
  };

  return (
    <RegisterUI
      errorText={errMsg || ''}
      isLoading={isLoading}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};

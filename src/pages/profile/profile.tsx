import { ProfileUI } from '@ui-pages';
import { UserActions } from '@slices';
import { UserSelectors } from '@selectors';
import { TRegisterData } from '@api';
import { useDispatch, useSelector } from '../../services/store';
import { FC, SyntheticEvent, useEffect, useState } from 'react';

export const Profile: FC = () => {
  const user = useSelector(UserSelectors.selectUser);
  const isLoading = useSelector(UserSelectors.selectIsLoading);
  const err = useSelector(UserSelectors.selectError);
  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState<string | null>(null);
  const userFormValue: TRegisterData = {
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  };
  const [formValue, setFormValue] = useState(userFormValue);

  useEffect(() => {
    setFormValue(userFormValue);
  }, [user]);

  const isNameChanged = formValue.name !== user?.name;
  const isEmailChanged = formValue.email !== user?.email;
  const isPasswordChanged = !!formValue.password;
  const isFormChanged = isNameChanged || isEmailChanged || isPasswordChanged;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newValues: Partial<TRegisterData> = {};
    if (isNameChanged) {
      if (!formValue.name) {
        setErrMsg('Необходимо ввести имя');
        return;
      } else newValues.name = formValue.name;
    }
    if (isEmailChanged) {
      if (!formValue.email) {
        setErrMsg('Необходимо ввести email');
        return;
      } else newValues.email = formValue.email;
    }
    if (isPasswordChanged) newValues.password = formValue.password;
    dispatch(UserActions.getUpdateUserThunk(newValues))
      .unwrap()
      .catch(() => setErrMsg(err));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrMsg(null);
    setFormValue(userFormValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMsg(null);
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={errMsg || ''}
      isLoading={isLoading}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};

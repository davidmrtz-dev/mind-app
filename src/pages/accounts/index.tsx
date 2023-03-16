import { useEffect, useState } from "react";
import styled from "styled-components";
import { IAccount } from "../../@types";
import { getAccounts } from "../../api/core/Account";
import { LoadingMask } from "../../atoms/LoadingMask";
import Alert from "../../components/alert";
import Title from "../../components/title";

const AccountsContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
`;

const AccountsPage = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [accounts, setAccounts] = useState<IAccount []>([]);
  const [showNew, setShowNew] = useState(false);

  const fetchAccounts = async (): Promise<void> => {
    try {
      const data = await getAccounts({ offset: 0, limit: 20 });
      setAccounts(data.accounts);
      setTimeout(() => setLoading(false), 1500);
    } catch (err: any) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.error || 'There was an error, please try again later'
      }), 1000);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  return(<>
    {Title('Accounts', () => setShowNew(true))}
    {loading
      ? <LoadingMask fixed />
      : <AccountsContainer reveal={reveal}>
          {(accounts || []).map(_account =>
            // <User
            //   key={user.id}
            //   user={user}
            //   onClick={() => handleUserClick(user)}
            // />
            <>okok</>
          )}
        </AccountsContainer>
      }
  </>)
};

export default AccountsPage;
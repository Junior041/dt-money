import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';
import logoImg from '../../assets/logo.svg';
import * as Dialog from '@radix-ui/react-dialog';
import { NewsTrasnactionsModal } from '../NewTransactionsModal';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewsTrasnactionsModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}

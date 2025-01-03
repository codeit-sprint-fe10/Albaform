import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user';
import { UserRole } from '@/types/user';
import {
  MENU_APPLICANT_OPTIONS,
  MENU_OWNER_OPTIONS,
} from '@/constants/dropdown';
import Dropdown, { Option } from './Dropdown';

const MenuDropdown = ({ albaId }: { albaId: number }) => {
  const user = useUserStore((state) => state.user);
  const { push } = useRouter();

  const handleDropdownSelect = (option: Option) => {
    switch (option.key) {
      case 'apply':
        push(`/apply/${albaId}`);
        break;
      case 'scrap':
        // Scrap
        break;
      case 'modify':
        // push ModifyPage
        break;
      case 'delete':
        // open DeleteModal
        break;
    }
  };

  if (!user) return;
  return (
    <Dropdown
      type="menu"
      options={
        user.role === UserRole.applicant
          ? MENU_APPLICANT_OPTIONS
          : MENU_OWNER_OPTIONS
      }
      onSelect={handleDropdownSelect}
    />
  );
};

export default MenuDropdown;

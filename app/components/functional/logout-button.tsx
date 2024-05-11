'use client'
import { logout } from '@/actions/auth';

export function LogoutButton() {
  return (
    <button type="button" onClick={async () => {
      await logout();
    }}>
      Logout
    </button>
  )
};
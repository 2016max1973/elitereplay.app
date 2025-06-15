'use client';

import {usePathname, useRouter} from 'next/navigation';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (locale: string) => {
    const newPath = `/${locale}${pathname.replace(/^\/(en|de|es)/, '')}`;
    router.push(newPath);
  };

  return (
    <select
      onChange={(e) => changeLocale(e.target.value)}
      defaultValue={pathname.split('/')[1]}
      className="border px-2 py-1 text-black fixed bg-white right-4 top-4 z-50"
    >
      <option value="en">EN</option>
      <option value="de">DE</option>
      <option value="es">ES</option>
    </select>
  );
};

export default LanguageSwitcher;

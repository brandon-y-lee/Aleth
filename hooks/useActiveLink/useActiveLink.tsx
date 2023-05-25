import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import { RoutesEnum } from '../../types/Global.types';
import { selectNavLink } from '../../redux/slices/header';
// import { selectNavLink as selectFooterNavLink } from '../../redux/slices/footer';
import { SelectedNavLinkEnum } from '../../types/state/headerType';
// import { SelectedNavLinkEnum as SelectedFooterNavLinkEnum } from '../../types/state/footerTypes';

// This hook selects the current active link on header and footer

export default function useActiveLink() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentRoute = router.pathname;
  // const hashId = router.pathname.split('#')[1];
  const hashId = router.pathname.includes('#')
    ? router.pathname.split('#')[1]
    : undefined;

  useEffect(() => {
    console.log(currentRoute);
    console.log(hashId);
    console.log(router);
    if (currentRoute === RoutesEnum.FEATURES) {
      if (hashId === 'blog') {
        dispatch(selectNavLink(SelectedNavLinkEnum.BLOG));
      } else {
        dispatch(selectNavLink(SelectedNavLinkEnum.FEATURES));
      }
      // dispatch(selectFooterNavLink(SelectedFooterNavLinkEnum.Contact));
    } else if (currentRoute === RoutesEnum.CONTACT_US) {
      dispatch(selectNavLink(SelectedNavLinkEnum.CONTACT));
      // dispatch(selectFooterNavLink(SelectedFooterNavLinkEnum.Terms));
    }
  }, [dispatch, currentRoute, hashId, router]);

  return {
    currentRoute,
  };
}

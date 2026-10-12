import { useCallback, useEffect, useState } from 'react';
import { getCampus, type Campus, type CampusId } from './data';

const fromUrl = () => getCampus(new URLSearchParams(window.location.search).get('campus'));

// El campus activo vive en ?campus=... para poder compartir enlaces. Sin parámetro: Navidad.
export function useCampus(): [Campus, (id: CampusId) => void] {
  const [campus, setCampus] = useState<Campus>(fromUrl);

  useEffect(() => {
    const onPop = () => setCampus(fromUrl());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.campus = campus.id;
    document.title = campus.seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', campus.seo.description);
  }, [campus]);

  const select = useCallback((id: CampusId) => {
    const next = getCampus(id);
    const url = new URL(window.location.href);
    url.searchParams.set('campus', next.id);
    url.hash = '';
    history.pushState(null, '', url);
    setCampus(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return [campus, select];
}

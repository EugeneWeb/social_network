export function formatDate(date: Date) {
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function removeFalsyProperties(obj: {[key: string]: any} | undefined | null) {
    if(!obj) return undefined
    for (let prop in obj) {
      if (!obj[prop]) {
        delete obj[prop];
      }
    }
    return obj;
  }
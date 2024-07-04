export const defineRoomFilterQuery = (
  field: string | null,
  value: string | null,
  page: string | null,
): string => {
  let query;

  if (value === 'all') query = '';
  else query = `?${field}${value}`;

  query = query === '' ? `?page=${page ?? 1}` : query + `&page=${page ?? 1}`;

  return query;
};

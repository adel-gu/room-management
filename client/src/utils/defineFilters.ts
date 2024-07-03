export const defineRoomFilterQuery = (
  field: string | null,
  page: string | null,
): string => {
  let query;
  switch (field) {
    case 'no-discount':
      query = '?discount=0';
      break;
    case 'with-discount':
      query = '?discount[gt]=0';
      break;
    default:
      query = '';
      break;
  }

  query = query === '' ? `?page=${page ?? 1}` : query + `&page=${page ?? 1}`;

  return query;
};

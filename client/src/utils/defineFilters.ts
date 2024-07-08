export const defineRoomFilterQuery = (
  field: string | null,
  value: string | null,
  page: string | null,
  sort: string | null,
): string => {
  let query;

  if (value === 'all' || value == null) query = '';
  else query = `?${field}${value}`;

  query = query === '' ? `?page=${page ?? 1}` : query + `&page=${page ?? 1}`;

  query = !!sort ? query + `&sort${sort}` : query + `&sort=-createdAt`;

  return query;
};

export const defineGuestSearchQuery = (
  value: string | null,
  page: string | null,
) => {
  let query = '';

  if (!!value)
    query = `?search=${value}&fields=fullName,email,nationality,phone,nationalID`;

  query = !!query ? query + `&page=${page ?? 1}` : `?page=${page ?? 1}`;
  return query;
};

// Tambahkan komponen ErrorMessage
export default function ErrorMessageForm({
  message,
}: {
  message: string | undefined;
}) {
  return <span className="-mt-2 text-sm text-red-500">{message}</span>;
}

/**
 * UserMessage component displays a message sent by the user in the chat interface.
 */
export const UserMessage = ({ message }: { message: string }) => {
  return (
    <div
      className={`
        flex flex-col gap-2
        w-auto max-w-[75%]
        bg-stone-100
        gap-2
        rounded-xl
        px-5 py-2
        text-base
        ml-auto
      `}
    >
      {message}
    </div>
  );
}
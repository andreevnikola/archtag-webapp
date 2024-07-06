export function Holder({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "flex w-full min-h-reasonably-tall justify-center items-center p-2 " +
        className
      }
    >
      {children}
    </div>
  );
}

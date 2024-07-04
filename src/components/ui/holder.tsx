export function Holder({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full min-h-reasonably-tall justify-center items-center p-2">
      {children}
    </div>
  );
}

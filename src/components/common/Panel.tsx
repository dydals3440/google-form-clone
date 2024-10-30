import { PropsWithChildren } from "react";

export default function Panel({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col p-20 pt-26 bg-white rounded-10">
      {children}
    </div>
  );
}

export function PanelHeader({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}

export function PanelBody({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}

export function PanelFooter({ children }: PropsWithChildren) {
  return (
    <>
      <hr className="border-gray100" />
      <>{children}</>
    </>
  );
}

export function PanelCap({ children }: PropsWithChildren) {
  return (
    // relative를 통해, 가려진걸 보이게 설정할 수 있음.
    <div className="-mb-10 relative">
      {/* inline-block으로 본인 크기에 맞게 */}
      <div className="inline-block px-14 pt-10 pb-6 bg-main rounded-t-10 text-15 text-white">
        {children}
      </div>
      <div className="bg-main h-9" />
    </div>
  );
}

"use client";

interface AuthContainerProps {
  title: string;
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children, title }) => {
  return (
    <div className="rounded-3xl bg-white/10 p-12">
      <h1 className="flex w-full justify-center pb-6 text-4xl font-semibold uppercase tracking-tighter">
        {title}
      </h1>

      {children}
    </div>
  );
};

export default AuthContainer;

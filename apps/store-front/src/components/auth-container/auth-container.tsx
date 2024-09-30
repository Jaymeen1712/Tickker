"use client";

interface AuthContainerProps {
  title: string;
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children, title }) => {
  return (
    <div className="bg-blue-lightest border-blue-light rounded-3xl border p-12">
      <h1 className="flex w-full justify-center pb-6 text-3xl font-semibold text-blue-primary">
        {title}
      </h1>

      {children}
    </div>
  );
};

export default AuthContainer;

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="md:px-6 p-2 mx-auto max-w-[1600px]">{children}</div>;
};

export default Container;

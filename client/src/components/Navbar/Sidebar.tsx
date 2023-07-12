export const Sidebar = () => {
  return (
    <div className="bg-[#f3f3f3] h-screen min-h-screen md:grid md:grid-rows-12">
      <div className="text-center mt-4 row-span-1 border-b-2 border-b-black">
        Logo
      </div>
      <div className="row-span-10">
        <ul>
          <li>20</li>
          <li>20</li>
          <li>20</li>
          <li>20</li>
          <li>20</li>
        </ul>
      </div>
      <div className="row-span-3 border-t-2 border-t-black">Logout</div>
    </div>
  );
};

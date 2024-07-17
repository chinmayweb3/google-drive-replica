import Files from "./drive/files";
import Menu from "./drive/menu";

const Drive = () => {
  return (
    <main className="min-h-[100%] pt-[100px]">
      <section className="mx-auto w-full max-w-[1440px] pt-[100px]">
        <Menu />
        <Files />
      </section>
    </main>
  );
};

export default Drive;

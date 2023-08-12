import Xlogo from "@/images/Xlogo";

export default function loading() {
  return (
    <div className=" text-white animate-pulse animate-infinite animate-duration-[1500ms] animate-ease-in-out animate-fill-both flex justify-center py-24">
      <Xlogo width="100px" height="100px" padding="0px" />
    </div>
  );
}

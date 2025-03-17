export default function ContainerQuerySample() {
  return (
    <div className="@container flex items-center bg-red-50 p-4 my-4">
      <div className="flex items-center justify-between w-full gap-6">
        <div className="flex flex-col bg-blue-200 @md:bg-orange-200 @lg:bg-pink-400 @xl:bg-yellow-300">
          <p className="text-base font-bold text-pretty">Rajiv S</p>
          <p className="text-xs text-mono-2">Open Source Developer</p>
        </div>
      </div>
    </div>
  );
}

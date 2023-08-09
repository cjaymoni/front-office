export const EmptyTemplate = () => {
  return (
    <section className="py-4 bg-neutral-50 overflow-hidden">
      <div className="container px-4 mx-auto">
        <img className="mx-auto" src="dashy-assets/images/empty.png" alt="" />
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-heading mb-3 text-2xl font-semibold">
            It&rsquo;s a bit empty here
          </h2>
          <p className="mb-7 text-neutral-500">Add items to view list</p>
        </div>
      </div>
    </section>
  );
};

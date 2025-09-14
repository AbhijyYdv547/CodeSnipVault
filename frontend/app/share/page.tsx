import ShareCard from "@/components/share-card";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-10">
      Shared Snippet ❤
      <ShareCard />
    </div>
  );
}

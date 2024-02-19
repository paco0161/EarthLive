import Spinner from "@/components/ui/spinner";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex h-screen items-center justify-center">
            <div role="status">
                <Spinner />
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
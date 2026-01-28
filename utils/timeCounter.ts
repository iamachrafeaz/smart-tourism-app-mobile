export default function timeAgo(dateString: string) {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    // Simplified logic
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}
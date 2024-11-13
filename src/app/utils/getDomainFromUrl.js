export default function getDomainFromUrl(url) {
    const {hostname,pathname} = new URL(url);  // Extract the hostname
    const domain = hostname.startsWith('www.') ? hostname.slice(4) : hostname;

    // Return the full domain with the path if available
    return domain + pathname;

}
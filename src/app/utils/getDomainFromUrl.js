export default function getDomainFromUrl(url) {
    const domain = new URL(url).hostname;  // Extract the hostname
    return domain.startsWith('www.') ? domain.slice(4) : domain;  // Remove 'www.' if it exists

}
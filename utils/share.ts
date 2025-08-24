export const handleShare = (platform: string, title: string) => {
  const url = window.location.href;
  const text = title;

  switch (platform) {
    case "twitter":
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
      );
      break;
    case "telegram":
      window.open(
        `https://t.me/share/url?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
      );
      break;
    default:
      navigator.clipboard?.writeText(`${text} - ${url}`);
  }
};

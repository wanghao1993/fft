import { TwitterIcon } from "@/components/icons";
export type enumPlatform =
  | "email"
  | "twitter"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "twitch"
  | "discord"
  | "telegram"
  | "wechat"
  | "weibo"
  | "bilibili";
export const socialIcons: Record<enumPlatform, React.ReactNode> = {
  email: (
    <img
      alt={"email"}
      style={{ height: "30px" }}
      src={"/social-icons/mail_icon.svg"}
    />
  ),
  twitter: (
    <img
      alt={"twitter"}
      style={{ height: "20px" }}
      src={"/social-icons/x_icon.svg"}
    />
  ),
  facebook: (
    <img
      alt={"facebook"}
      style={{ height: "24px" }}
      src={"/social-icons/facebook_icon.svg"}
    />
  ),
  instagram: (
    <img
      alt={"instagram"}
      style={{ height: "28px" }}
      src={"/social-icons/ins_icon.svg"}
    />
  ),
  linkedin: (
    <img
      alt={"linkedin"}
      style={{ height: "24px" }}
      src={"/social-icons/linkdin_icon.svg"}
    />
  ),
  youtube: (
    <img
      alt={"youtube"}
      style={{ height: "24px" }}
      src={"/social-icons/youtube_icon.svg"}
    />
  ),
  tiktok: (
    <img
      alt={"tiktok"}
      style={{ height: "30px" }}
      src={"/social-icons/tiktok_icon.svg"}
    />
  ),
  twitch: (
    <img
      alt={"twitch"}
      style={{ height: "24px" }}
      src={"/social-icons/twitch_icon.svg"}
    />
  ),
  discord: (
    <img
      alt={"discord"}
      style={{ height: "30px" }}
      src={"/social-icons/discord_icon.svg"}
    />
  ),
  telegram: (
    <img
      alt={"telegram"}
      style={{ height: "24px" }}
      src={"/social-icons/telegram_icon.svg"}
    />
  ),
  wechat: (
    <img
      alt={"wechat"}
      style={{ height: "28px" }}
      src={"/social-icons/wechat_icon.svg"}
    />
  ),
  weibo: (
    <img
      alt={"weibo"}
      style={{ height: "28px" }}
      src={"/social-icons/weibo_icon.svg"}
    />
  ),
  bilibili: (
    <img
      alt={"bilibili"}
      style={{ height: "30px" }}
      src={"/social-icons/bilibili_icon.svg"}
    />
  ),
};

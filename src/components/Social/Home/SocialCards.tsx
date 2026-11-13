import { useTranslations } from 'next-intl';
import socialLinks from "@/types/social/social";

const SocialCards = () => {
    const t = useTranslations('broadcast');

    const SocialCard = ({ link }) => {
        return (
            <a
              className    = "social-card"
              data-node-id = {link.nodeId}
              href         = {link.href}
              target       = "_blank"
              rel          = "noreferrer"
              aria-label   = {`Visit ${link.name}: ${link.detail}`}
            >
                <span className="social-card__top">
                    <img
                        src         = {link.icon}
                        width       = {link.iconWidth}
                        height      = {link.iconHeight}
                        alt         = ""
                        aria-hidden = "true"
                        className   = {link.class_name}
                    />
                        <span
                            className = "social-card__tag"
                            style     = {{ color: link.accent, backgroundColor: link.tint }}
                        >
                            {link.label_footer}
                        </span>
                  </span>
                  <span className="social-card__name">{link.name}</span>
                  <span className="social-card__detail">{link.detail}</span>
            </a>
        );
    }

    return (
        <main className="mt-10 px-5 sm:px-8">
            <section className="broadcast-hub" aria-labelledby="broadcast-heading">
                <div className="broadcast-copy">
                    <div className="broadcast-eyebrow">
                        <span className="live-dot" aria-hidden="true" />
                        <span>{t('community_broadcast_hub')}</span>
                    </div>
                    <h1 id="broadcast-heading">{t('follow_catalan_legacy_online')}</h1>
                    <p>{t('watch_feature_match_replays')}</p>
                </div>

                <nav className="social-grid" aria-label={t('catalan_legacy_social_channels')}>
                    {socialLinks.map((link) => (
                      <SocialCard key={link.name} link={link} />
                    ))}
                </nav>
            </section>
        </main>
    );
}

export default SocialCards;

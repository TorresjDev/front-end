import { bool, node, string } from 'prop-types';
import { gtag } from 'common/utils/thirdParty/gtag';
import ExternalLinkIcon from 'static/images/icons/FontAwesome/external-link-square-alt-solid.svg';
import ScreenReaderOnly from 'components/ScreenReaderOnly/ScreenReaderOnly';
import classNames from 'node_modules/classnames/index';

OutboundLink.propTypes = {
  // will report this label plus the URL from where it was clicked
  analyticsEventLabel: string.isRequired,
  children: node.isRequired,
  className: string,
  'data-testid': string,
  hasIcon: bool,
  href: string.isRequired,
};

OutboundLink.defaultProps = {
  className: undefined,
  'data-testid': undefined,
  hasIcon: true,
};

function OutboundLink({
  analyticsEventLabel,
  children,
  'data-testid': testID,
  className,
  hasIcon,
  href,
}) {
  const isNotMailToLink = !href.startsWith('mailto:');

  const trackOutboundLinkClick = () => {
    gtag.outboundLink(analyticsEventLabel, href);
  };

  return (
    <a
      className={classNames('inline-flex items-start', className)}
      data-testid={testID}
      href={href}
      onClick={trackOutboundLinkClick}
      rel={isNotMailToLink ? 'noopener noreferrer' : undefined}
      target={isNotMailToLink ? '_blank' : undefined}
    >
      {children}

      <ScreenReaderOnly>Opens in new window</ScreenReaderOnly>

      {hasIcon && <ExternalLinkIcon className="!fill-current relative my-0 mx-1 bottom-0 w-3" />}
    </a>
  );
}

export default OutboundLink;

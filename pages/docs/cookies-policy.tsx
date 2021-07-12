import React from "react";
import Page from "../../components/Docs/Page";

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default function Doc(props) {
  return (
    <Page
      text={`
Cookies Policy  
==============

Last updated: July 12, 2021

This Cookies Policy explains what Cookies are and how We use them. You should
read this policy so You can understand what type of cookies We use, or the
information We collect using Cookies and how that information is used.

Cookies do not typically contain any information that personally identifies a
user, but personal information that we store about You may be linked to the
information stored in and obtained from Cookies. For further information on
how We use, store and keep your personal data secure, see our Privacy Policy.

We do not store sensitive personal information, such as mailing addresses,
account passwords, etc. in the Cookies We use.

Interpretation and Definitions  
==============================

Interpretation  
--------------

The words of which the initial letter is capitalized have meanings defined
under the following conditions. The following definitions shall have the same
meaning regardless of whether they appear in singular or in plural.

Definitions  
-----------

For the purposes of this Cookies Policy:

  * Company (referred to as either "the Company", "We", "Us" or "Our" in this
    Cookies Policy) refers to Mnemoscene Ltd, 34 Cambridge Road, Hove, BN3
    1DF.
  * Cookies means small files that are placed on Your computer, mobile device
    or any other device by a website, containing details of your browsing
    history on that website among its many uses.
  * Website refers to interaction.study, accessible from <https://interaction.study>
  * You means the individual accessing or using the Website, or a company, or
    any legal entity on behalf of which such individual is accessing or using
    the Website, as applicable.

The use of the Cookies  
======================

Type of Cookies We Use  
----------------------

Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on
your personal computer or mobile device when You go offline, while Session
Cookies are deleted as soon as You close your web browser.

We use both session and persistent Cookies for the purposes set out below:

  * Necessary / Essential Cookies

    Type: Session Cookies

    Administered by: Us

    Purpose: These Cookies are essential to provide You with services
    available through the Website and to enable You to use some of its
    features. They help to authenticate users and prevent fraudulent use of
    user accounts. Without these Cookies, the services that You have asked for
    cannot be provided, and We only use these Cookies to provide You with
    those services.

  * Cookies Policy / Notice Acceptance Cookies

    Type: Persistent Cookies

    Administered by: Us

    Purpose: These Cookies identify if users have accepted the use of cookies
    on the Website.

  * Functionality Cookies

    Type: Persistent Cookies

    Administered by: Us

    Purpose: These Cookies allow us to remember choices You make when You use
    the Website, such as remembering your login details or language
    preference. The purpose of these Cookies is to provide You with a more
    personal experience and to avoid You having to re-enter your preferences
    every time You use the Website.

  * Tracking and Performance Cookies

    Type: Persistent Cookies

    Administered by: Third-Parties

    Purpose: These Cookies are used to track information about traffic to the
    Website and how users use the Website. The information gathered via these
    Cookies may directly or indirectly identify you as an individual visitor.
    This is because the information collected is typically linked to a
    pseudonymous identifier associated with the device you use to access the
    Website. We may also use these Cookies to test new pages, features or new
    functionality of the Website to see how our users react to them.

  * Social Media Cookies

    Type: Persistent Cookies

    Administered by: Third-Parties

    Purpose: In addition to Our own Cookies, We may also use various third
    party plug-ins from social media networking websites such as Facebook,
    Instagram, Twitter or Google+ to report usage statistics of the Website
    and to provide social media features. These third party plug-ins may store
    Cookies. We do not control these Social Media Cookies. Please refer to the
    relevant social media networking's website privacy policies for
    information about their cookies.

Your Choices Regarding Cookies  
------------------------------

If You prefer to avoid the use of Cookies on the Website, first You must
disable the use of Cookies in your browser and then delete the Cookies saved
in your browser associated with this website. You may use this option for
preventing the use of Cookies at any time.

If You do not accept Our Cookies, You may experience some inconvenience in
your use of the Website and some features may not function properly.

If You'd like to delete Cookies or instruct your web browser to delete or
refuse Cookies, please visit the help pages of your web browser.

  * For the Chrome web browser, please visit this page from Google:
    <https://support.google.com/accounts/answer/32050>

  * For the Internet Explorer web browser, please visit this page from
    Microsoft: <http://support.microsoft.com/kb/278835>

  * For the Firefox web browser, please visit this page from Mozilla:
    <https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-
    stored>

  * For the Safari web browser, please visit this page from Apple:
    <https://support.apple.com/guide/safari/manage-cookies-and-website-data-
    sfri11471/mac>


For any other web browser, please visit your web browser's official web pages.

More Information about Cookies  
------------------------------

You can learn more about cookies here: [All About Cookies by
TermsFeed](https://www.termsfeed.com/blog/cookies/).

Contact Us  
----------

If you have any questions about this Cookies Policy, You can contact us:

  * By visiting this page on our website: <https://interaction.study/docs/contact>
        
`
      }
    />
  );
}
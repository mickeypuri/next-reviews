/** @type {import('next').NextConfig} */
module.exports = {
  //output: 'export',
  images: {
    remotePatterns: [
      toRemotePattern()
    ]
  }
};

function toRemotePattern() {
  const {protocol, hostname, port, pathname} = new URL(process.env.CMS_IMAGE_PATTERN);
  return {
    protocol: protocol.replace(":", ""),
    hostname,
    port,
    pathname
  };
}
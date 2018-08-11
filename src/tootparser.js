import HtmlParser from 'htmlparser';
import HtmlEntities from 'he';

const domNodeToText = (node, text = []) => {
  const { name, type, attribs = {}, children } = node;
  const { class: className } = attribs;

  // regular text
  if (type === 'text') {
    text.push(node.data);
    return;
  }
  // ignore invisible content (cw)
  if (className != null && className.includes('invisible')) {
    return;
  }
  // ignore url
  if (name === 'a') {
    return;
  }
  // analyze children
  if (children != null && children.length > 0) {
    children.forEach((child) => {
      domNodeToText(child, text);
    });
  }
};

const analyzeTootDom = (dom) => {
  const texts = [];
  if (dom.length > 0) {
    dom.forEach((child) => {
      domNodeToText(child, texts);
    });
  }

  if (texts.length === 0) {
    return null;
  }

  return HtmlEntities.decode(texts.join(' ')).trim();
};

export const parseToot = async (toot) => {
  return new Promise((resolve, reject) => {
    const handler = new HtmlParser.DefaultHandler((error, dom) => {
      if (error == null) {
        resolve(analyzeTootDom(dom));
      } else {
        reject(error);
      }
    });
  
    const parser = new HtmlParser.Parser(handler);
    parser.parseComplete(toot);
  });
};

export default parseToot;

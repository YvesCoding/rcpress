'use strict';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = function blockPlugin() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var regex = /\:\:\: (.*?)(?:\|(.*?))?\n([\s\S]*?)\n *?\:\:\:/;

  function findTypeAndTitle(option, type) {
    var primitiveType = '';
    var title = '';

    for (var key in option) {
      var value = option[key];
      for (var j = 0; j < value.length; j++) {
        if (value[j].alias == type) {
          primitiveType = key;
          title = value[j].defaultTitle;
          break;
        }
      }

      if (primitiveType && title) {
        return {
          type: primitiveType,
          title
        };
      }
    }

    return {
      type: primitiveType,
      title
    };
  }

  function blockTokenizer(eat, value, silent) {
    var now = eat.now();
    var keep = regex.exec(value);
    if (!keep) return;
    if (keep.index !== 0) return;

    var _keep = _slicedToArray(keep, 3),
      eaten = _keep[0],
      blockType = _keep[1],
      blockTitle = _keep[2],
      blockContent = _keep[3];

    blockType = blockType.trim();
    var { type, title } = findTypeAndTitle(options, blockType);

    if (silent || !type) return !!type;

    var stringToEat = eaten;
    var add = eat(stringToEat);

    var exit = this.enterBlock();
    var contents = this.tokenizeBlock((blockContent || '').replace(/\n/g, '\n\n'), now);
    exit();

    return add({
      type: 'MdAlert',
      children: contents,
      hProperties: {
        className: 'md-alert'
      },
      data: {
        hName: 'MdAlert',
        hProperties: {
          message: blockTitle || title,
          type
        }
      }
    });
  }

  var Parser = this.Parser; // Inject blockTokenizer

  var blockTokenizers = Parser.prototype.blockTokenizers;
  var blockMethods = Parser.prototype.blockMethods;
  blockTokenizers.mdAlert = blockTokenizer;
  blockMethods.splice(blockMethods.indexOf('fencedCode') + 1, 0, 'mdAlert');

  var interruptParagraph = Parser.prototype.interruptParagraph;
  var interruptList = Parser.prototype.interruptList;
  var interruptBlockquote = Parser.prototype.interruptBlockquote;
  interruptParagraph.splice(interruptParagraph.indexOf('fencedCode') + 1, 0, ['mdAlert']);
  interruptList.splice(interruptList.indexOf('fencedCode') + 1, 0, ['mdAlert']);
  interruptBlockquote.splice(interruptBlockquote.indexOf('fencedCode') + 1, 0, ['mdAlert']);
};

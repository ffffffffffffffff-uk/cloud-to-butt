// applied changes from https://github.com/panicsteve/cloud-to-butt/pull/41/commits/2b10bd5e31b81b29b4bbd27f14630a2d4cadbbe8
//
walk(document.body);

if (window.MutationObserver) {
	var observer = new MutationObserver(function (mutations) {
		Array.prototype.forEach.call(mutations, function (m) {
			if (m.type === 'childList') {
				walk(m.target);
			} else if (m.target.nodeType === 3) {
				handleText(m.target);
			}
		});
	});

	observer.observe(document.body, {
		childList: true,
		attributes: false,
		characterData: true,
		subtree: true
	});
}


function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	
	var tagName = node.tagName ? node.tagName.toLowerCase() : "";
	if (tagName == 'input' || tagName == 'textarea') {
		return;
	}
	if (node.classList && node.classList.contains('ace_editor')) {
		return;
	}

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	var oldValue = textNode.nodeValue;
	v = oldValue;

	v = v.replace(/\bThe Cloud\b/g, "My Butt");
	v = v.replace(/\bThe cloud\b/g, "My butt");
	v = v.replace(/\bthe Cloud\b/g, "my Butt");
	v = v.replace(/\bthe cloud\b/g, "my butt");
	v = v.replace(/\bCOVID-19\b/gi, "trains");
	v = v.replace(/\bcoronavirus\b/gi, "trains");
	v = v.replace(/\bSARS-CoV-2\b/gi, "trains");
	v = v.replace(/\bbitcoin\b/gi, "numberwang");
	v = v.replace(/\bcryptocurrency\b/gi, "numberwang");
	v = v.replace(/\bcryptos\b/gi, "numberwangs");
	v = v.replace(/\bBTC\b/gi, "numberwang");
	// avoid infinite series of DOM changes
	if (v !== oldValue) {
		textNode.nodeValue = v;
	}
	
}



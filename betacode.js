/**
 * @file Enables the efficient typing of characters with diacritical marks by using the betacode notation
 * @author Marc Scheffler
 * @version 2.2.1
 */

"use strict";

// HTML Element that represents the currently selected betacode suggestion; null if the selection panel is not visible
let currentlySelectedEntry;
// Contains the mapping of the betacode sequence to the actual character and provides the getMatches-Method
let betacode = {
    catalogue: [
        { sequence: 'A', character: '&#x0041' },
        { sequence: 'A\\', character: '&#x00C0' },
        { sequence: 'A/', character: '&#x00C1' },
        { sequence: 'A^1', character: '&#x00C2' },
        { sequence: 'A~', character: '&#x00C3' },
        { sequence: 'A:', character: '&#x00C4' },
        { sequence: 'A|', character: '&#x00C5' },
        { sequence: 'A3', character: '&#x00C6' },
        { sequence: 'A-', character: '&#x0100' },
        { sequence: 'A!', character: '&#x0102' },
        { sequence: 'A|/', character: '&#x01FA' },
        { sequence: 'A@/', character: '&#x0041'+'&#x032F'+'&#x0301' },
        { sequence: 'a', character: '&#x0061' },
        { sequence: 'a\\', character: '&#x00E0' },
        { sequence: 'a/', character: '&#x00E1' },
        { sequence: 'a~', character: '&#x00E3' },
        { sequence: 'a:', character: '&#x00E4' },
        { sequence: 'a3', character: '&#x00E6' },
        { sequence: 'a-', character: '&#x0101' },
        { sequence: 'a!', character: '&#x0103' },
        { sequence: 'a^1', character: '&#x00E2' },
        { sequence: 'a|', character: '&#x00E5' },
        { sequence: 'a:\\', character: '&#x0061'+'&#x0308'+'&#x0300' },
        { sequence: 'a-~', character: '&#x0061'+'&#x0304'+'&#x0303' },
        { sequence: 'a-/', character: '&#x0061'+'&#x0304'+'&#x0301' },
        { sequence: 'a-\\', character: '&#x0061'+'&#x0304'+'&#x0300' },
        { sequence: 'a~\\', character: '&#x0061'+'&#x0303'+'&#x0300' },
        { sequence: 'a:-', character: '&#x01DF' },
        { sequence: 'a|/', character: '&#x01FB' },
        { sequence: 'a|-', character: '&#x0061'+'&#x030A'+'&#x0304' },
        { sequence: 'a:/', character: '&#x0061'+'&#x0308'+'&#x0301' },
        { sequence: 'a:~', character: '&#x0061'+'&#x0308'+'&#x0303' },
        { sequence: 'a:~/', character: '&#x0061'+'&#x0308'+'&#x0303'+'&#x0301' },
        { sequence: 'a|-/', character: '&#x0061'+'&#x030A'+'&#x0304'+'&#x0301' },
        { sequence: 'a-~/', character: '&#x0061'+'&#x0304'+'&#x0303'+'&#x0301' },
        { sequence: 'a:-/', character: '&#x0061'+'&#x0308'+'&#x0304'+'&#x0301' },
        { sequence: 'a@', character: '&#x0061'+'&#x032F' },
        { sequence: 'a3-', character: '&#x01E3' },
        { sequence: 'B', character: '&#x0042' },
        { sequence: 'b', character: '&#x0062' },
        { sequence: 'b2', character: '&#x0180' },
        { sequence: 'C', character: '&#x0043' },
        { sequence: 'C)2', character: '&#x00C7' },
        { sequence: 'c', character: '&#x0063' },
        { sequence: 'c)2', character: '&#x00E7' },
        { sequence: 'C/', character: '&#x0106' },
        { sequence: 'c/', character: '&#x0107' },
        { sequence: 'c)/', character: '&#x0063'+'&#x0313'+'&#x0301' },
        { sequence: 'C^', character: '&#x010C' },
        { sequence: 'c^', character: '&#x010D' },
        { sequence: 'D', character: '&#x0044' },
        { sequence: 'D2', character: '&#x0110' },
        { sequence: 'D?', character: '&#x1E0C' },
        { sequence: 'd', character: '&#x0064' },
        { sequence: 'd_', character: '&#x1E0F' },
        { sequence: 'd?', character: '&#x1E0D' },
        { sequence: 'd3', character: '&#x00F0' },
        { sequence: 'D_', character: '&#x1E0E' },
        { sequence: 'd2', character: '&#x0111' },
        { sequence: 'E', character: '&#x0045' },
        { sequence: 'E\\', character: '&#x00C8' },
        { sequence: 'E/', character: '&#x00C9' },
        { sequence: 'E:', character: '&#x00CB' },
        { sequence: 'E-', character: '&#x0112' },
        { sequence: 'E!', character: '&#x0114' },
        { sequence: 'E~', character: '&#x1EBC' },
        { sequence: 'E@', character: '&#x0045'+'&#x032F' },
        { sequence: 'E^1', character: '&#x00CA' },
        { sequence: 'e', character: '&#x0065' },
        { sequence: 'e/', character: '&#x00E9' },
        { sequence: 'e\\', character: '&#x00E8' },
        { sequence: 'e:', character: '&#x00EB' },
        { sequence: 'e-', character: '&#x0113' },
        { sequence: 'e!', character: '&#x0115' },
        { sequence: 'e~', character: '&#x1EBD' },
        { sequence: 'e^1', character: '&#x00EA' },
        { sequence: 'e^', character: '&#x011B' },
        { sequence: 'e:/', character: '&#x0065'+'&#x0308'+'&#x0301' },
        { sequence: 'e:\\', character: '&#x0065'+'&#x0308'+'&#x0300' },
        { sequence: 'e-~', character: '&#x0065'+'&#x0304'+'&#x0303' },
        { sequence: 'e-/', character: '&#x1E17' },
        { sequence: 'e~/', character: '&#x0065'+'&#x0303'+'&#x0301' },
        { sequence: 'e:-', character: '&#x0065'+'&#x0308'+'&#x0304' },
        { sequence: 'e-~/', character: '&#x0065'+'&#x0304'+'&#x0303'+'&#x0301' },
        { sequence: 'e:-/', character: '&#x0065'+'&#x0308'+'&#x0304'+'&#x0301' },
        { sequence: 'e?', character: '&#x1EB9' },
        { sequence: 'e(', character: '&#x0065'+'&#x031C' },
        { sequence: 'e@', character: '&#x0065'+'&#x032F' },
        { sequence: 'e?/', character: '&#x0065'+'&#x0323'+'&#x0301' },
        { sequence: 'e?-/', character: '&#x0065'+'&#x0323'+'&#x0304'+'&#x0301' },
        { sequence: 'e(/', character: '&#x0065'+'&#x031C'+'&#x0301' },
        { sequence: 'e(-', character: '&#x0065'+'&#x031C'+'&#x0304' },
        { sequence: 'e(-/', character: '&#x0065'+'&#x031C'+'&#x0304'+'&#x0301' },
        { sequence: 'e1', character: '&#x01DD' },
        { sequence: 'e1/', character: '&#x01DD'+'&#x0301' },
        { sequence: 'e1~', character: '&#x01DD'+'&#x0303' },
        { sequence: 'e1~/', character: '&#x01DD'+'&#x0303'+'&#x0301' },
        { sequence: 'e1-~', character: '&#x01DD'+'&#x0304'+'&#x0303' },
        { sequence: 'e1-/', character: '&#x01DD'+'&#x0304'+'&#x0301' },
        { sequence: 'F', character: '&#x0046' },
        { sequence: 'f', character: '&#x0066' },
        { sequence: 'G', character: '&#x0047' },
        { sequence: 'G?1', character: '&#x0120' },
        { sequence: 'G/', character: '&#x01F4' },
        { sequence: 'G^', character: '&#x01E6' },
        { sequence: 'g', character: '&#x0067' },
        { sequence: 'g?1', character: '&#x0121' },
        { sequence: 'g/', character: '&#x01F5' },
        { sequence: 'g^', character: '&#x01E7' },
        { sequence: 'g)/', character: '&#x0067'+'&#x0313'+'&#x0301' },
        { sequence: 'H', character: '&#x0048' },
        { sequence: 'H?', character: '&#x1E24' },
        { sequence: 'H@1', character: '&#x1E2A' },
        { sequence: 'h', character: '&#x0068' },
        { sequence: 'h?', character: '&#x1E25' },
        { sequence: 'h@1', character: '&#x1E2B' },
        { sequence: 'I', character: '&#x0049' },
        { sequence: 'I\\', character: '&#x00CC' },
        { sequence: 'I/', character: '&#x00CD' },
        { sequence: 'I^1', character: '&#x00CE' },
        { sequence: 'I:', character: '&#x00CF' },
        { sequence: 'I!', character: '&#x012C' },
        { sequence: 'I~', character: '&#x0128' },
        { sequence: 'I@', character: '&#x0049'+'&#x032F' },
        { sequence: 'I-', character: '&#x012A' },
        { sequence: 'i', character: '&#x0069' },
        { sequence: 'i\\', character: '&#x00EC' },
        { sequence: 'i/', character: '&#x00ED' },
        { sequence: 'i^1', character: '&#x00EE' },
        { sequence: 'i:', character: '&#x00EF' },
        { sequence: 'i!', character: '&#x012D' },
        { sequence: 'i~', character: '&#x0129' },
        { sequence: 'i-', character: '&#x012B' },
        { sequence: 'i-~', character: '&#x0069'+'&#x0304'+'&#x0303' },
        { sequence: 'i-/', character: '&#x0069'+'&#x0304'+'&#x0301' },
        { sequence: 'i~/', character: '&#x0069'+'&#x0303'+'&#x0301' },
        { sequence: 'i:-', character: '&#x0069'+'&#x0308'+'&#x0304' },
        { sequence: 'i:/', character: '&#x1E2F' },
        { sequence: 'i:\\', character: '&#x0069'+'&#x0308'+'&#x0300' },
        { sequence: 'i-~/', character: '&#x0069'+'&#x0304'+'&#x0303'+'&#x0301' },
        { sequence: 'i:-/', character: '&#x0069'+'&#x0308'+'&#x0304'+'&#x0301' },
        { sequence: 'i@', character: '&#x0069'+'&#x032F' },
        { sequence: 'J', character: '&#x004A' },
        { sequence: 'J^1', character: '&#x0134' },
        { sequence: 'J\\', character: '&#x004A'+'&#x0300' },
        { sequence: 'J/', character: '&#x004A'+'&#x0301' },
        { sequence: 'j', character: '&#x006A' },
        { sequence: 'j^1', character: '&#x0135' },
        { sequence: 'j\\', character: '&#x006A'+'&#x0300' },
        { sequence: 'j/', character: '&#x006A'+'&#x0301' },
        { sequence: 'K', character: '&#x004B' },
        { sequence: 'k', character: '&#x006B' },
        { sequence: 'k$', character: '&#x006B'+'&#x0329' },
        { sequence: 'L', character: '&#x004C' },
        { sequence: 'l', character: '&#x006C' },
        { sequence: 'l&', character: '&#x006C'+'&#x0325' },
        { sequence: 'L2', character: '&#x2C62' },
        { sequence: 'l2', character: '&#x026B' },
        { sequence: 'M', character: '&#x004D' },
        { sequence: 'M&', character: '&#x004D'+'&#x0325' },
        { sequence: 'm', character: '&#x006D' },
        { sequence: 'm&', character: '&#x006D'+'&#x0325' },
        { sequence: 'N', character: '&#x004E' },
        { sequence: 'N/', character: '&#x0143' },
        { sequence: 'n', character: '&#x006E' },
        { sequence: 'n/', character: '&#x0144' },
        { sequence: 'n&', character: '&#x006E'+'&#x0325' },
        { sequence: 'n-', character: '&#x006E'+'&#x0304' },
        { sequence: 'N~', character: '&#x00D1' },
        { sequence: 'n~', character: '&#x00F1' },
        { sequence: 'N2', character: '&#x014A' },
        { sequence: 'n2', character: '&#x014B' },
        { sequence: 'n2~', character: '&#x014B'+'&#x0303' },
        { sequence: 'O', character: '&#x004F' },
        { sequence: 'O/', character: '&#x00D3' },
        { sequence: 'O\\', character: '&#x00D2' },
        { sequence: 'O^1', character: '&#x00D4' },
        { sequence: 'O~', character: '&#x00D5' },
        { sequence: 'O!', character: '&#x014E' },
        { sequence: 'O-', character: '&#x014C' },
        { sequence: 'O:', character: '&#x00D6' },
        { sequence: 'O@', character: '&#x004F'+'&#x032F' },
        { sequence: 'o', character: '&#x006F' },
        { sequence: 'o/', character: '&#x00F3' },
        { sequence: 'o\\', character: '&#x00F2' },
        { sequence: 'o^1', character: '&#x00F4' },
        { sequence: 'o~', character: '&#x00F5' },
        { sequence: 'o!', character: '&#x014F' },
        { sequence: 'o-', character: '&#x014D' },
        { sequence: 'o:', character: '&#x00F6' },
        { sequence: 'o~-', character: '&#x022D' },
        { sequence: 'o-/', character: '&#x1E53' },
        { sequence: 'o~/', character: '&#x1E4D' },
        { sequence: 'o/2', character: '&#x0151' },
        { sequence: 'o:/', character: '&#x006F'+'&#x0308'+'&#x0301' },
        { sequence: 'o-~/', character: '&#x006F'+'&#x0304'+'&#x0303'+'&#x0301' },
        { sequence: 'o@', character: '&#x006F'+'&#x032F' },
        { sequence: 'o?', character: '&#x1ECD' },
        { sequence: 'o?/', character: '&#x006F'+'&#x0323'+'&#x0301' },
        { sequence: 'o?-', character: '&#x006F'+'&#x0323'+'&#x0304' },
        { sequence: 'o?-/', character: '&#x006F'+'&#x0323'+'&#x0304'+'&#x0301' },
        { sequence: 'o4', character: '&#x01EB' },
        { sequence: 'o4/', character: '&#x01EB'+'&#x0301' },
        { sequence: 'o4-', character: '&#x01EB'+'&#x0304' },
        { sequence: 'o4-/', character: '&#x01EB'+'&#x0304'+'&#x0301' },
        { sequence: 'O1', character: '&#x0152' },
        { sequence: 'o1', character: '&#x0153' },
        { sequence: 'o1/', character: '&#x0153'+'&#x0301' },
        { sequence: 'o1~', character: '&#x0153'+'&#x0303' },
        { sequence: 'o1-', character: '&#x0153'+'&#x0304' },
        { sequence: 'o1-~', character: '&#x0153'+'&#x0304'+'&#x0303' },
        { sequence: 'o1-/', character: '&#x0153'+'&#x0304'+'&#x0301' },
        { sequence: 'o1~/', character: '&#x0153'+'&#x0303'+'&#x0301' },
        { sequence: 'o1-~/', character: '&#x0153'+'&#x0304'+'&#x0303'+'&#x0301' },
        { sequence: 'o1?', character: '&#x0153'+'&#x0323' },
        { sequence: 'o1(', character: '&#x0153'+'&#x031C' },
        { sequence: 'o1?/', character: '&#x0153'+'&#x0323'+'&#x0301' },
        { sequence: 'o1?~', character: '&#x0153'+'&#x0323'+'&#x0303' },
        { sequence: 'o1?-', character: '&#x0153'+'&#x0323'+'&#x0304' },
        { sequence: 'o1?-/', character: '&#x0153'+'&#x0323'+'&#x0304'+'&#x0301' },
        { sequence: 'o1?-~', character: '&#x0153'+'&#x0323'+'&#x0304'+'&#x0303' },
        { sequence: 'o1?~/', character: '&#x0153'+'&#x0323'+'&#x0303'+'&#x0301' },
        { sequence: 'o1?-~/', character: '&#x0153'+'&#x0323'+'&#x0304'+'&#x0303'+'&#x0301' },
        { sequence: 'o1(/', character: '&#x0153'+'&#x031C'+'&#x0301' },
        { sequence: 'o1(~', character: '&#x0153'+'&#x031C'+'&#x0303' },
        { sequence: 'o1(-', character: '&#x0153'+'&#x031C'+'&#x0304' },
        { sequence: 'o1(-~', character: '&#x0153'+'&#x031C'+'&#x0304'+'&#x0303' },
        { sequence: 'o1(-/', character: '&#x0153'+'&#x031C'+'&#x0304'+'&#x0301' },
        { sequence: 'o1(~/', character: '&#x0153'+'&#x031C'+'&#x0303'+'&#x0301' },
        { sequence: 'o1(-~/', character: '&#x0153'+'&#x031C'+'&#x0304'+'&#x0303'+'&#x0301' },
        { sequence: 'O5', character: '&#x00D8' },
        { sequence: 'o5', character: '&#x00F8' },
        { sequence: 'P', character: '&#x0050' },
        { sequence: 'p', character: '&#x0070' },
        { sequence: 'p$', character: '&#x0070'+'&#x0329' },
        { sequence: 'P2', character: '&#x00DE' },
        { sequence: 'p2', character: '&#x00FE' },
        { sequence: 'Q', character: '&#x0051' },
        { sequence: 'q', character: '&#x0071' },
        { sequence: 'R', character: '&#x0052' },
        { sequence: 'R^', character: '&#x0158' },
        { sequence: 'R?', character: '&#x1E5A' },
        { sequence: 'r', character: '&#x0072' },
        { sequence: 'r^', character: '&#x0159' },
        { sequence: 'r^1', character: '&#x0072'+'&#x0302' },
        { sequence: 'r&', character: '&#x0072'+'&#x0325' },
        { sequence: 'r?', character: '&#x1E5B' },
        { sequence: 'S', character: '&#x0053' },
        { sequence: 'S)2', character: '&#x015E' },
        { sequence: 'S^', character: '&#x0160' },
        { sequence: 's', character: '&#x0073' },
        { sequence: 's?', character: '&#x1E63' },
        { sequence: 's)2', character: '&#x015F' },
        { sequence: 's$', character: '&#x0219' },
        { sequence: 's^', character: '&#x0161' },
        { sequence: 'T', character: '&#x0054' },
        { sequence: 'T)2', character: '&#x0162' },
        { sequence: 'T?', character: '&#x1E6C' },
        { sequence: 'T_', character: '&#x1E6E' },
        { sequence: 't', character: '&#x0074' },
        { sequence: 't?', character: '&#x1E6D' },
        { sequence: 't)2', character: '&#x0163' },
        { sequence: 't_', character: '&#x1E6F' },
        { sequence: 't$', character: '&#x021B' },
        { sequence: 'U', character: '&#x0055' },
        { sequence: 'U/', character: '&#x00DA' },
        { sequence: 'U\\', character: '&#x00D9' },
        { sequence: 'U^', character: '&#x01D3' },
        { sequence: 'U^1', character: '&#x00DB' },
        { sequence: 'U!', character: '&#x016C' },
        { sequence: 'U~', character: '&#x0168' },
        { sequence: 'U-', character: '&#x016A' },
        { sequence: 'U:', character: '&#x00DC' },
        { sequence: 'U:/', character: '&#x0055'+'&#x0308'+'&#x0301' },
        { sequence: 'U@', character: '&#x0055'+'&#x032F' },
        { sequence: 'u', character: '&#x0075' },
        { sequence: 'u/', character: '&#x00FA' },
        { sequence: 'u\\', character: '&#x00F9' },
        { sequence: 'u^', character: '&#x01D4' },
        { sequence: 'u^1', character: '&#x00FB' },
        { sequence: 'u~', character: '&#x0169' },
        { sequence: 'u!', character: '&#x016D' },
        { sequence: 'u-', character: '&#x016B' },
        { sequence: 'u:', character: '&#x00FC' },
        { sequence: 'u-~', character: '&#x0075'+'&#x0304'+'&#x0303' },
        { sequence: 'u-/', character: '&#x0075'+'&#x0304'+'&#x0301' },
        { sequence: 'u~/', character: '&#x1E79' },
        { sequence: 'u:-', character: '&#x01D6' },
        { sequence: 'u:/', character: '&#x01D8' },
        { sequence: 'u:\\', character: '&#x01DC' },
        { sequence: 'u-~/', character: '&#x0075'+'&#x0304'+'&#x0303'+'&#x0301' },
        { sequence: 'u:-/', character: '&#x0075'+'&#x0308'+'&#x0304'+'&#x0301' },
        { sequence: 'u:~', character: '&#x0075'+'&#x0308'+'&#x0303' },
        { sequence: 'u:~/', character: '&#x0075'+'&#x0308'+'&#x0303'+'&#x0301' },
        { sequence: 'u@', character: '&#x0075'+'&#x032F' },
        { sequence: 'V', character: '&#x0056' },
        { sequence: 'v', character: '&#x0076' },
        { sequence: 'W', character: '&#x0057' },
        { sequence: 'w', character: '&#x0077' },
        { sequence: 'W/', character: '&#x1E82' },
        { sequence: 'w/', character: '&#x1E83' },
        { sequence: 'X', character: '&#x0058' },
        { sequence: 'x', character: '&#x0078' },
        { sequence: 'Y', character: '&#x0059' },
        { sequence: 'Y/', character: '&#x00DD' },
        { sequence: 'Y:', character: '&#x0178' },
        { sequence: 'y', character: '&#x0079' },
        { sequence: 'y/', character: '&#x00FD' },
        { sequence: 'y\\', character: '&#x1EF3' },
        { sequence: 'y^1', character: '&#x0177' },
        { sequence: 'y-/', character: '&#x0079'+'&#x0304'+'&#x0301' },
        { sequence: 'y:', character: '&#x00FF' },
        { sequence: 'Z', character: '&#x005A' },
        { sequence: 'Z)2', character: '&#x005A'+'&#x0327' },
        { sequence: 'Z^', character: '&#x017D' },
        { sequence: 'Z?', character: '&#x1E92' },
        { sequence: 'z', character: '&#x007A' },
        { sequence: 'z?', character: '&#x1E93' },
        { sequence: 'z)2', character: '&#x007A'+'&#x0327' },
        { sequence: 'z$', character: '&#x007A'+'&#x0329' },
        { sequence: 'z^', character: '&#x017E' },
        { sequence: 'Z1', character: '&#x01B7' },
        { sequence: 'z1', character: '&#x0292' },
        { sequence: 'a1', character: '&#x03B1' },
        { sequence: 'b1', character: '&#x03B2' },
        { sequence: 'd1', character: '&#x03B4' },
        { sequence: 'e3', character: '&#x03B5' },
        { sequence: 'g1', character: '&#x03B3' },
        { sequence: 't1', character: '&#x03B8' },
        { sequence: 'p1', character: '&#x03C0' },
        { sequence: 's1', character: '&#x03C3' },
        { sequence: 'f1', character: '&#x03C6' },
        { sequence: 'c1', character: '&#x03C7' },
    ],
    getMatches : function (searchValue) {
        return betacode.catalogue.filter(match => match.sequence.startsWith(searchValue));
    }
};

$(document).ready(function () {
    // references the element that is closest to (possibly dynamically added) child-elements with the class="betacode-targetField"
    let anchor = $(".betacode-anchor");

    anchor.on("focus", ".betacode-targetField", function (keycode) {
        if($(this).parent().attr("class") !== "betacode-container"){
            // This targetfield has not been properly wrapped yet
            wrap($(this));
        }
    });

    /**
     * Displays the betacode suggestions after the user inputs characters into the targetField
     * @keycode A value from keyup-function representing the key the user pressed on his keyboard
     * Will not be triggered for the following keycodes: 9 = Tab, 13 = Enter, 27 = Escape, 38 = arrow-up, 40 = arrow-down
     */
    anchor.on("keyup", ".betacode-targetField", function (keycode) {
        if (![9, 13, 27, 38, 40].includes(keycode.which)) {
            // keyup was a regular key
            displayBetacodeSuggestions($(this), $(this).siblings(".betacode-suggestion-panel"));
        }
    });

    // enables keyboard controls
    anchor.on("keydown", ".betacode-targetField", function (keycode) {
        performKeyboardAction($(this), $(this).siblings(".betacode-suggestion-panel"), keycode);
    });

    // enables dynamic mouseover highlighting
    anchor.on('mouseenter', 'div.betacode-suggestions', function () {
        makeSelection($(this));
    });

    // enables betacode insertion via mouseclick
    anchor.on('click', ".betacode-suggestion-panel", function () {
        insertSelectedCharacter($(this).siblings(".betacode-targetField"), $(this));
    });

    // Disables suggestion display if targetField is deselected
    anchor.on('focusout', ".betacode-targetField", function (event) {
        let self = this;
        // If no suggestion were visible, don't clear the panel
        if($(self).siblings(".betacode-suggestion-panel").children().length>0){
            // TODO: Interferes with eventhandlers above
            window.setTimeout(function() { 
                clearSuggestionPanel($(self).siblings(".betacode-suggestion-panel"));
            }, 200);
        }
    });
    
});

function wrap(targetField) {
    // Wrapping the targetField element inside a custom div for css formatting
    targetField.wrap("<div class='betacode-container'></div>");
    // Appending the div for the display of suggestions as a sibling to the targetField
    $("<br/><div class='betacode-suggestion-panel'></div>").insertAfter(targetField);
    targetField.closest('.betacode-container').find('.betacode-targetField').focus();
}

/**
 * Displays suggestions of diacritcal marks based on the most recent typed characters (prepended with an #)
 * @param {jQuery} targetField The current targetField jQuery-object
 * @param {jQuery} suggestionPanel The current suggestionPanel jQuery-object
 */
function displayBetacodeSuggestions(targetField, suggestionPanel) {
    clearSuggestionPanel(suggestionPanel);

    let cursorPosition = targetField.prop("selectionStart");
    // Ignoring every character coming after the current cursor position
    let actualInput = targetField[0].value.substring(0, cursorPosition);
    // If no #-sign has been inserted at all
    if (actualInput.lastIndexOf("#") === -1)
        return;
    // Ignoring every character before (including) the last occurance of the #-sign
    actualInput = actualInput.substring(actualInput.lastIndexOf("#") + 1, cursorPosition);

    if (actualInput.length > 0) {
        // Checking the input for matches in the betacode sequences
        let matches = betacode.getMatches(actualInput);
        // Counter that is required to limit the amount of displayed suggestions
        let amountOfDisplayedSuggestions = 5;
        // Creating and filling the suggestion panel with actual suggestions
        matches.some(function (match) {
            // a row contains a char(-acter) and its sequence
            let row = document.createElement('div');
            let char = document.createElement('div');
            let sequence = document.createElement('div');

            // filling the new elements with their respective content
            sequence.innerHTML = match.sequence;
            char.innerHTML = match.character;

            // adding classes for proper css
            sequence.classList.add("betacode-sequences");
            char.classList.add("betacode-characters");
            row.classList.add("betacode-suggestions");

            // adding the elements to the dom
            row.appendChild(char);
            row.appendChild(sequence);
            suggestionPanel[0].appendChild(row);

            // Breaking out of the loop as soon as 5 matches are displayed
            amountOfDisplayedSuggestions--;
            return amountOfDisplayedSuggestions === 0;
        });

        // If there is input after the #-sign to work with
        if (actualInput !== "") {
            // Default highlighting for the first suggestion
            currentlySelectedEntry = suggestionPanel[0].firstChild;
            // Adding class for highlighting
            $(currentlySelectedEntry).addClass('betacode-current-selection');
        } else // Hiding the suggestions if a user deletes his input
            clearSuggestionPanel(suggestionPanel);
    }
}

/**
 * Inserts the currently selected character into the targetField and replaces it with the sequence (#...)
 * @param {jQuery} targetField The current targetField jQuery-object
 * @param {jQuery} suggestionPanel The current suggestionPanel jQuery-object
 */
function insertSelectedCharacter(targetField, suggestionPanel) {
    let cursorPosition = targetField.prop("selectionStart"),
        // Cutting off everything in the targetField after the current cursor position
        textBeforeTheEndOfSequence = targetField[0].value.substring(0, cursorPosition),
        // Extracting the sequence that was actually typed
        sequenceTyped = textBeforeTheEndOfSequence.substring(textBeforeTheEndOfSequence.lastIndexOf("#"), cursorPosition+1),
        // Cutting off everything after (including) the sequence
        textBeforeSequence = textBeforeTheEndOfSequence.substring(0, textBeforeTheEndOfSequence.lastIndexOf("#")),
        // Getting the length of the sequence that was actually typed (without #)
        lengthOfActualSequence = sequenceTyped.length-1,
        // Cutting off everything before (including) the sequence
        textAfterSequence = targetField[0].value.substring(cursorPosition, targetField[0].value.length);

    // Replacing the targetField's value with the new (concatenated) value
    targetField[0].value = textBeforeSequence + currentlySelectedEntry.firstChild.innerHTML + textAfterSequence;

    // Necessary for cursor repositioning
    let isCombined = currentlySelectedEntry.firstChild.innerHTML.length > 1,
        amountCombined = currentlySelectedEntry.firstChild.innerHTML.length;

    // Clean-up:
    clearSuggestionPanel(suggestionPanel); // emptying the sugggestions panel
    targetField.focus();

    // Cursor repositioning
    if(!isCombined){
        // setting the cursor position behind the new inserted character
        targetField[0].selectionStart = cursorPosition-lengthOfActualSequence;
        targetField[0].selectionEnd = cursorPosition-lengthOfActualSequence;
    } else {
        // Cursor repositioning works different with combined characters
        targetField[0].selectionStart = cursorPosition-(lengthOfActualSequence-amountCombined)-1;
        targetField[0].selectionEnd = cursorPosition-(lengthOfActualSequence-amountCombined)-1;
    }
}

/**
 * Handles keyboard events such as:
 * - up-/down navigation (keycode: 38/40) for a selection change
 * - escape (keycode: 27) for clearing the suggestions
 * - enter (keycode: 13) to insert a character
 * - tabulator (keycode: 9) to insert a character
 * @param {jQuery} targetField The targeted Field in which the keystroke was registered
 * @param {jQuery} suggestionPanel The suggestion panel beeing the sibling of the targetField
 * @param {jQuery} keycode The key that was pressed
 */
function performKeyboardAction(targetField, suggestionPanel, keycode) {
    switch (keycode.which) {
        case 9: // tab: fall-through to enter
        case 13: // enter
            keycode.preventDefault();
            // If there is a currently selected entry
            if (currentlySelectedEntry) insertSelectedCharacter(targetField, suggestionPanel);
            break;
        case 27: // escape
            keycode.preventDefault();
            // If there is a currently selected entry
            if (currentlySelectedEntry) clearSuggestionPanel(suggestionPanel);
            break;
        case 38: // arrow up
            keycode.preventDefault();
            // If there is a currently selected entry
            if (currentlySelectedEntry) {
                // Prohibits the selection of the previous suggestion if the current selection is the first suggesetion in the list
                if (currentlySelectedEntry.previousSibling !== null)
                    makeSelection($(currentlySelectedEntry.previousSibling));
            }
            break;
        case 40: // arrow down
            keycode.preventDefault();
            // If there is a currently selected entry
            if (currentlySelectedEntry) {
                // Prohibits the selection of the next suggestion if the current selection is the last suggesetion in the list
                if (currentlySelectedEntry.nextSibling !== null)
                    makeSelection($(currentlySelectedEntry.nextSibling));
            }
            break;
        default: break; // not needed
    }
}

/**
 * Updates the currently seleted entry and deletes the old one
 * @param {jQuery} newSelection jQuery-Object of the newly selected DOM element
 */
function makeSelection(newSelection) {
    // Removing the visual highlighting from the old selection
    $(currentlySelectedEntry).removeClass('betacode-current-selection');
    // Internally updating the new selection
    currentlySelectedEntry = newSelection[0];
    // Visually highlighting the new selection
    $(currentlySelectedEntry).addClass('betacode-current-selection');
}

/**
 * Clears the suggestions panel
 * @param {jQuery} suggestionPanel The current asuggestion panel
 */
function clearSuggestionPanel(suggestionPanel) {
    currentlySelectedEntry = "";
    suggestionPanel[0].innerHTML = "";
}

/**
 * A jQuery object
 * @typedef jQuery
 */

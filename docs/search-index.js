znaiSearchData = [["challenge-mode@@challenge-mode@@introduction","Challenge Mode","Challenge Mode","Introduction","Learn how to beat Challenge Mode with strategies and multiple example fleets for each month of the constellation extreme challenge mode in Azur Lane Each month s page will have strategies and several example fleets Although we try to be detailed in strategies and provide multiple example fleets we do not know what ships or gear you have Treat the example fleets as examples and consider your own better upgrades or close substitutes We assume Hard Augur difficulty but the same strategies usually work for lower difficulties with worse fleets and gear We also assume auto battle only because most of the difficult CM gimmicks are nullified by proper manualing Always check boss stats and skills on Extreme Challenge wiki or in game but sometimes the game says a wrong number Tip Fleet screenshots using Azur Lane Fleet Tool show the vanguard from bottom main tank to top off tank It s like the in game Formation screen but rotated counter clockwise The ships are also marked with 1 2 and 3 from bottom to top",""],["challenge-mode@@challenge-mode@@timing","Challenge Mode","Challenge Mode","Timing","Most CM s are exercises in reading and timing Oaths or exact gear levels 10 to 13 are not required unless for timing However many example fleets are timing sensitive and you often won t have the exact ships oaths gear cat RLD and RLD tech to copy them correctly Then you will need to calculate your own fleet timing To the best of our knowledge this online calculator henceforth referred to as the calculator is the only one that is precise enough for these CM timing calculations We highly recommend not being scared by it and learning how to use it on desktop If an example fleet requires 50 CV RLD with oath that means you need oathed CVs and have CV reload from tech cats 50 Alternatively it would also probably work without oaths and with CV tech cats 57 or 58 Due to how the game code loop works some boss skills boss movement patterns or ship skills can be delayed by 0 0s to 0 1s every time This is more noticeable in long battles like the game mode this guide is for Some strategies attempt to account for this delay but sometimes it can t be fixed",""],["challenge-mode@@december@@","Challenge Mode","December Challenge","","Comprehensive strategies and example fleets for how to beat Warspite the December Incarnation of Sagittarius challenge mode boss",""]]
/*
 * Copyright 2024 znai maintainers
 * Copyright 2019 TWO SIGMA OPEN SOURCE, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var createStopWordFilter = function (stopWords) {
    var words = stopWords.reduce(function (memo, stopWord) {
        memo[stopWord] = stopWord
        return memo
    }, {})
    return function (token) {
        if (token && words[token.toString()] !== token.toString()) return token
    }
}

var stopWordFilter = createStopWordFilter([
    'a',
    'am',
    'an',
    'at',
    'be',
    'so',
    'to'
])

znaiSearchIdx = lunr(function () {
    this.pipeline.remove(lunr.stemmer)
    this.ref('id')
    this.field('section')
    this.field('pageTitle')
    this.field('pageSection')
    this.field('textStandard')
    this.field('textHigh')

    this.metadataWhitelist = ['position']

    znaiSearchData.forEach(function (e) {
        this.add({
            id: e[0],
            section: e[1],
            pageTitle: e[2],
            pageSection: e[3],
            textStandard: e[4],
            textHigh: e[5],
        })
    }, this)
})

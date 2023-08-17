"use client";

import { useEffect, useState } from "react";

interface Props {
  children: string;

  /**
   * Show kanji every letterAmount letters
   * @default 2
   */
  letterAmount?: number;
  /**
   * Time in ms
   * @default 400
   */
  time?: number;
  /**
   * Delay in ms
   * @default 0
   * */
  delay?: number;
}

const kanjis = [
  "中", // (naka) - middle, center
  "外", // (soto) - outside
  "大", // (dai) - big
  "小", // (shou) - small
  "今", // (ima) - now
  "明", // (mei) - bright
  "年", // (nen) - year
  "土", // (do) - soil, earth
  "分", // (fun) - minute, part
  "秒", // (byou) - second
  "週", // (shuu) - week
  "後", // (go) - after, later
  "午", // (go) - noon
  "前", // (mae) - before, front
  "夕", // (yuu) - evening
  "夜", // (yoru) - night
  "昨", // (saku) - yesterday
  "左", // (hidari) - left
  "右", // (migi) - right
  "北", // (kita) - north
  "西", // (nishi) - west
  "人", // (hito) - person
  "口", // (kuchi) - mouth
  "手", // (te) - hand
  "足", // (ashi) - foot, leg
  "目", // (me) - eye
  "耳", // (mimi) - ear
  "鼻", // (hana) - nose
  "心", // (kokoro) - heart, mind
  "体", // (karada) - body
  "力", // (chikara) - power, strength
  "校", // (kou) - school
  "先", // (saki) - before, ahead
  "会", // (kai) - meeting, association
  "社", // (sha) - company, organization
  "徒", // (to) - follower, disciple
  "生", // (sei) - life, birth
  "し", // (shi) - (kana character)
  "ム", // (mu) - (kana character)
  "消", // (shou) - extinguish, erase
  "鉛", // (en) - lead
  "筆", // (fude) - brush, pen
  "ゴ", // (go) - (kana character)
  "山", // (yama) - mountain
  "川", // (kawa) - river
  "火", // (hi) - fire
  "水", // (mizu) - water
  "木", // (ki) - tree
  "日", // (nichi) - sun, day
  "月", // (tsuki) - moon, month
  "犬", // (inu) - dog
  "魚", // (sakana) - fish
  "花", // (hana) - flower
  "雨", // (ame) - rain
  "学", // (gaku) - study, learning
  "車", // (kuruma) - car
  "金", // (kin) - gold
  "空", // (sora) - sky
  "百", // (hyaku) - hundred
  "千", // (sen) - thousand
  "万", // (man) - ten thousand
  "円", // (en) - yen, circle
  "上", // (ue) - up, above
  "下", // (shita) - down, below
];

export const LetterDecryptor = ({ children, letterAmount = 2, time = 400, delay = 0 }: Props) => {
  const [decryptedLetters, setDecryptedLetters] = useState(children.split(""));

  const originalLetters = children.split("");
  useEffect(() => {
    setTimeout(() => {
      const startTime = Date.now();
      const msToShowLetter = time / decryptedLetters.length;
      const interval1 = setInterval(() => {
        const elapsedTime = Date.now() - startTime;

        setDecryptedLetters(
          decryptedLetters.map((letter, index) => {
            const random = Math.floor(Math.random() * kanjis.length - 1);

            if (elapsedTime > msToShowLetter * index + 1) {
              return letter;
            }

            if (letter === " ") {
              return "";
            }

            // Show kanji every letterAmount letters
            if (index % letterAmount === 0) {
              return kanjis[random];
            }
            return "";
          }),
        );
      }, 50);

      setTimeout(() => {
        clearInterval(interval1);
        setDecryptedLetters(originalLetters);
      }, time);

      return () => {
        clearInterval(interval1);
        setDecryptedLetters(originalLetters);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, delay);
  }, []);

  return <>{decryptedLetters.join("")}</>;
};

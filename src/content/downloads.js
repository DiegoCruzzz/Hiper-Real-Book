import { h, Fragment } from "preact";

const downloadImages = [
  new URL("../img/download/angelica_nene_vila_matilde.jpg", import.meta.url).href,
  new URL("../img/download/azealia_megaphone.gif", import.meta.url).href,
  new URL("../img/download/bafora_amiga.jpg", import.meta.url).href,
  new URL("../img/download/beans.jpg", import.meta.url).href,
  new URL("../img/download/big_imitando_emojis.jpg", import.meta.url).href,
  new URL("../img/download/cardi_sus.gif", import.meta.url).href,
  new URL("../img/download/coesão_conceito_aclamação.jpg", import.meta.url).href,
  new URL("../img/download/dies_cringe.jpg", import.meta.url).href,
  new URL("../img/download/esnupi_acabado.jpg", import.meta.url).href,
  new URL("../img/download/friend_too_woke.jpeg", import.meta.url).href,
  new URL("../img/download/gloria_maria_mosteiro.gif", import.meta.url).href,
  new URL("../img/download/gloria_maria_rihanna_montanha_anti.gif", import.meta.url).href,
  new URL("../img/download/gretchen_anotado.gif", import.meta.url).href,
  new URL("../img/download/gretchen_artista_vdd.jpg", import.meta.url).href,
  new URL("../img/download/gretchen_dancando.gif", import.meta.url).href,
  new URL("../img/download/gretchen_faca.gif", import.meta.url).href,
  new URL("../img/download/gretchen_fatos.jpeg", import.meta.url).href,
  new URL("../img/download/gretchen_hj_em_dia.webp", import.meta.url).href,
  new URL("../img/download/gretchen_o_que.gif", import.meta.url).href,
  new URL("../img/download/gretchen_parabens.gif", import.meta.url).href,
  new URL("../img/download/gretchen_paris.gif", import.meta.url).href,
  new URL("../img/download/gretchen_telefone.gif", import.meta.url).href,
  new URL("../img/download/hubert.png", import.meta.url).href,
  new URL("../img/download/if_you_re_from_shut_up.jpg", import.meta.url).href,
  new URL("../img/download/ines_calor.gif", import.meta.url).href,
  new URL("../img/download/ines_coca.gif", import.meta.url).href,
  new URL("../img/download/ines_comida.gif", import.meta.url).href,
  new URL("../img/download/ines_encarando.gif", import.meta.url).href,
  new URL("../img/download/ines_mamao.gif", import.meta.url).href,
  new URL("../img/download/ines_peace.gif", import.meta.url).href,
  new URL("../img/download/ines_vamo_fazer_o_que.gif", import.meta.url).href,
  new URL("../img/download/jasmine_xmas.jpg", import.meta.url).href,
  new URL("../img/download/ler_escrever_carrossel.jpeg", import.meta.url).href,
  new URL("../img/download/mulher_pepita_celular_pizza.jpg", import.meta.url).href,
  new URL("../img/download/nicki_stalkin_real_bitch.jpg", import.meta.url).href,
  new URL("../img/download/pabllo_nojo.gif", import.meta.url).href,
  new URL("../img/download/pass_the_blunt.jpg", import.meta.url).href,
  new URL("../img/download/pepita_arrepiada.webp", import.meta.url).href,
  new URL("../img/download/pepita_foda-se.gif", import.meta.url).href,
  new URL("../img/download/pepita_katniss.jpg", import.meta.url).href,
  new URL("../img/download/pepita_levantando.gif", import.meta.url).href,
  new URL("../img/download/pepita_nao_preocupe.jpeg", import.meta.url).href,
  new URL("../img/download/pepita_pilintra.jpg", import.meta.url).href,
  new URL("../img/download/pepita_porra.gif", import.meta.url).href,
  new URL("../img/download/pepita_ran.gif", import.meta.url).href,
  new URL("../img/download/pepita_so_crazy_love_her.gif", import.meta.url).href,
  new URL("../img/download/pepita_staring.gif", import.meta.url).href,
  new URL("../img/download/pepita_xiu.gif", import.meta.url).href,
  new URL("../img/download/que_mecanismo.jpeg", import.meta.url).href,
  new URL("../img/download/rainha-do-pop-gaga.gif", import.meta.url).href,
  new URL("../img/download/skyferreira_fev_marc.jpg", import.meta.url).href,
  new URL("../img/download/ta_no_face.webp", import.meta.url).href,
  new URL("../img/download/talento_charts_gretchen.jpeg", import.meta.url).href,
  new URL("../img/download/talvez_venha_ai.jpg", import.meta.url).href,
  new URL("../img/download/the_good_days_bitch_raising_her_glass.jpg", import.meta.url).href,
  new URL("../img/download/tiffany_crying_car.gif", import.meta.url).href,
  new URL("../img/download/topico_bobo.jpg", import.meta.url).href,
  new URL("../img/download/tulla_chorando_celular.webp", import.meta.url).href,
  new URL("../img/download/tulla_confetti.gif", import.meta.url).href,
  new URL("../img/download/tulla_luana_batendo.gif", import.meta.url).href,
  new URL("../img/download/tulla_saude.gif", import.meta.url).href,
  new URL("../img/download/urach_dancando.gif", import.meta.url).href,
  new URL("../img/download/urach_mistica.gif", import.meta.url).href,
  new URL("../img/download/urach_moonwalk.gif", import.meta.url).href,
  new URL("../img/download/urach_nuances.jpeg", import.meta.url).href,
  new URL("../img/download/urach_pose.gif", import.meta.url).href,
  new URL("../img/download/urach_shocked.gif", import.meta.url).href,
  new URL("../img/download/wanessa_wolf_reverso.gif", import.meta.url).href,
  new URL("../img/download/we_hit_the_elevator_madonna.gif", import.meta.url).href,
  new URL("../img/download/ygona_olhos_do_pai.jpg", import.meta.url).href,
];

const allImages = [ ...downloadImages];

export function SingleImageReader({ imageName }) {
  const imageUrl = allImages.find(src => src.includes(imageName));

  if (!imageUrl) {
    return <p>⚠️ Imagen não encontrada</p>;
  }

  return (
    <div className="ui95__reader-page" style={{maxWidth: '85%', padding: '0'}}>
      <img
        src={imageUrl}
        alt={imageName}
        style={{
          width: "100%",
          display: "block",
        }}
      />
    </div>
  );
}

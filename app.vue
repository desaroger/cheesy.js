<template>
  <div>
    <GameCard :game="game" />
    <KilledCard :game="game" />
  </div>
</template>

<script setup>
import { Game } from './chess/game';

const game = reactive(new Game());

</script>

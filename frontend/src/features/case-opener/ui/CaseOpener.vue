<template>
	<div>
		<div class="raffle-roller">
			<div class="raffle-roller-holder">
				<div class="raffle-roller-container" style="margin-left: 0px;">
				</div>
			</div>
		</div>
		<span style="font-size: 25px;">You winning is <span style="color: green;" id="rolled">rolling</span></span>
		<br />
		<button>go</button>
		<br />
		<div class="inventory"></div>
	</div>
</template>

<script setup lang='ts'>
const items = {
	simple: {
		skin: "M4A1-S | Cyrex",
		img: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_cu_m4a1s_cyrex_light_large.144b4053eb73b4a47f8128ebb0e808d8e28f5b9c.png"
	},
	middle: {
		skin: "M4A1-S | Chantico's Fire",
		img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygED6_UZrMTzwJYSdJlU8N1zY81TrxO_v0MW9uJnBm3Rk7nEk5XfUmEeyhQYMMLIUhCYx0A"
	},
	super: {
		skin: "M4A4 | Asiimov",
		img: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_cu_m4_asimov_light_large.af03179f3d43ff55b0c3d114c537eac77abdb6cf.png"
	}
};
</script>

<style scoped lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Arvo');

.raffle-roller {
	height: 100px;
	position: relative;
	margin: 60px auto 30px auto;
	width: 900px;
}

.raffle-roller-holder {
	position: absolute;

	overflow: hidden;
	border-radius: 2px;
	border: 1px solid #3c3759;

	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	width: 9999999999999999999px;
	max-width: 999999999999999999px;
	height: 100px;
	background: #191726;
	margin-left: 0;
	transition: all 8s cubic-bezier(.08,.6,0,1);

	&:before {
		content: "";
		position: absolute;
		border: none;
		z-index: 12222225;
		width: 5px;
		height: 100%;
		left: 50%;
		background: #d16266;
	}
}


.item {
	display: inline-block;
	margin: 4px 0 0.5px 5px;
	width: 85px;
	height: 88px;
	border: 1px solid #70677c;
	background-size: 100%;
	background: #14202b no-repeat center;
}

.class_red_item {
	border-bottom: 4px solid #EB4B4B;
}

img {
	border: 0;
	vertical-align: middle;
}

.winning-item {
	border: 2px solid #66b233;
	position: relative;
	top: -1px;
	border-bottom: 4px solid #66b233;
}

.inventory {
	margin: 0 auto;
	width: 960px;
	max-width: 953px;
	padding: 10px 15px 6px;
	height: auto;
	border: 2px solid #1c3344;
	background: #0e1a23;

	& > .item {
		float: none;
		cursor: pointer;
		margin: 4px 2px 0.5px 2px;

		&:hover {
			background-size: 90%;
			background-color: #182a38;
		}

		&:active {
			  height: 83px;
			  width: 80px;
			  position: relative;
			  top: -2px;
			  border: 2px solid #356d27;
			  border-bottom: 4px solid #356d27;
		  }
	}
}
</style>

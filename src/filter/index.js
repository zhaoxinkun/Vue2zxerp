import Vue from 'vue'
import * as filters from './filter.js'

Object.keys(filters).forEach(item=> Vue.filter(item,filters[item]))

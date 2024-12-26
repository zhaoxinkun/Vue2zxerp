export default {
    title: {
        text: 'WORLD COFFEE RESEARCH SENSORY LEXICON',
        subtext: 'Source: https://worldcoffeeresearch.org/work/sensory-lexicon/',
        textStyle: {
            fontSize: 8,
            align: 'center'
        },
        subtextStyle: {
            align: 'center'
        },
        sublink: 'https://worldcoffeeresearch.org/work/sensory-lexicon/'
    },
    series: {
        type: 'sunburst',
        data: [
            {
                name: 'Flora',
                itemStyle: {
                    color: '#da0d68'
                },
                children: [
                    {
                        name: 'Black Tea',
                        value: 1,
                        itemStyle: {
                            color: '#975e6d'
                        }
                    },
                    {
                        name: 'Floral',
                        itemStyle: {
                            color: '#e0719c'
                        },
                        children: [
                            {
                                name: 'Chamomile',
                                value: 1,
                                itemStyle: {
                                    color: '#f99e1c'
                                }
                            },
                            {
                                name: 'Rose',
                                value: 1,
                                itemStyle: {
                                    color: '#ef5a78'
                                }
                            },
                            {
                                name: 'Jasmine',
                                value: 1,
                                itemStyle: {
                                    color: '#f7f1bd'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Nutty/\nCocoa',
                itemStyle: {
                    color: '#a87b64'
                },
                children: [
                    {
                        name: 'Nutty',
                        itemStyle: {
                            color: '#c78869'
                        },
                        children: [
                            {
                                name: 'Peanuts',
                                value: 1,
                                itemStyle: {
                                    color: '#d4ad12'
                                }
                            },
                            {
                                name: 'Hazelnut',
                                value: 1,
                                itemStyle: {
                                    color: '#9d5433'
                                }
                            },
                            {
                                name: 'Almond',
                                value: 1,
                                itemStyle: {
                                    color: '#c89f83'
                                }
                            }
                        ]
                    },
                    {
                        name: 'Cocoa',
                        itemStyle: {
                            color: '#bb764c'
                        },
                        children: [
                            {
                                name: 'Chocolate',
                                value: 1,
                                itemStyle: {
                                    color: '#692a19'
                                }
                            },
                            {
                                name: 'Dark Chocolate',
                                value: 1,
                                itemStyle: {
                                    color: '#470604'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Sweet',
                itemStyle: {
                    color: '#e65832'
                },
                children: [
                    {
                        name: 'Brown Sugar',
                        itemStyle: {
                            color: '#d45a59'
                        },
                        children: [
                            {
                                name: 'Molasses',
                                value: 1,
                                itemStyle: {
                                    color: '#310d0f'
                                }
                            },
                            {
                                name: 'Maple Syrup',
                                value: 1,
                                itemStyle: {
                                    color: '#ae341f'
                                }
                            },
                            {
                                name: 'Caramelized',
                                value: 1,
                                itemStyle: {
                                    color: '#d78823'
                                }
                            },
                            {
                                name: 'Honey',
                                value: 1,
                                itemStyle: {
                                    color: '#da5c1f'
                                }
                            }
                        ]
                    },
                    {
                        name: 'Vanilla',
                        value: 1,
                        itemStyle: {
                            color: '#f89a80'
                        }
                    },
                    {
                        name: 'Vanillin',
                        value: 1,
                        itemStyle: {
                            color: '#f37674'
                        }
                    },
                    {
                        name: 'Overall Sweet',
                        value: 1,
                        itemStyle: {
                            color: '#e75b68'
                        }
                    },
                    {
                        name: 'Sweet Aromatics',
                        value: 1,
                        itemStyle: {
                            color: '#d0545f'
                        }
                    }
                ]
            }
        ],
        radius: [0, '95%'],
        sort: undefined,
        emphasis: {
            focus: 'ancestor'
        },
        levels: [
            {},
            {
                r0: '15%',
                r: '35%',
                itemStyle: {
                    borderWidth: 2
                },
                label: {
                    rotate: 'tangential'
                }
            },
            {
                r0: '35%',
                r: '70%',
                label: {
                    align: 'right'
                }
            },
            {
                r0: '70%',
                r: '72%',
                label: {
                    position: 'outside',
                    padding: 3,
                    silent: false
                },
                itemStyle: {
                    borderWidth: 3
                }
            }
        ]
    }
}

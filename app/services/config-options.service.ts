import { Injectable } from '@angular/core';

@Injectable()
export class ConfigOptionService {
    constructor() { } 

    paperSettings = {
        paperTitle: 'My Paper',
        apaMla: 'apa',
        spacing: 'doubleSpace',
        includeTitle: true,
        includeHeader: true,
        includeAbstractSummary: true,
        includeConclusion: true,
        includeReferencesWorksCited: true,
        titleInfoFont: 'Times New Roman',
        titleInfoFontSize: '12',
        titleInfoIncludeTitle: true,
        titleInfoIncludeName: true,
        titleInfoIncludeClass: false,
        titleInfoIncludeProfessor: false,
        titleInfoIncludeSchool: true,
        titleInfoIncludeOtherText: false,
        titleInfoIncludeTitleIndex: 0,
        titleInfoIncludeNameIndex: 1,
        titleInfoIncludeClassIndex: 2,
        titleInfoIncludeProfessorIndex: 3,
        titleInfoIncludeSchoolIndex: 4,
        titleInfoIncludeOtherTextIndex: 5,
        titleInfoAlign: 'titleInfoAlignCenter',
        titleInfoPos: 'titleInfoSeparatePage',
        headerFont: 'Times New Roman',
        headerFontSize: '12',
        headerLeft: 'headerLeftPaperTitle',
        headerLeftInput: 'My Paper',
        headerRight: 'headerRightPageNumber',
        headerRightInput: '',
        headerDifferentFirstPage: true,
        headerUseRunningHeader: true,
        headerMoreDifferent: false,
        headerFirstLeft: 'headerFirstLeftPaperTitle',
        headerFirstLeftInput: '',
        headerFirstRight: 'headerFirstRightPageNumber',
        headerFirstRightInput: '',
        summaryOwnPage: true,
        summaryIncludeSectionLabel: true,
        summarySectionLabelAlign: 'summarySectionLabelCenter',
        bodyBetweenSections: 'bodyBlankLineBetweenSections',
        bodyIncludeSectionLabels: true,
        bodyIncludeSubsectionLabels: true,
        bodyIncludeSubsubsectionLabels: true,
        bodySectionLabelPos: 'bodySectionLabelOwnLine',
        bodySectionLabelAlign: 'bodySectionLabelCenter',
        bodySubsectionLabelPos: 'bodySubsectionLabelOwnLine',
        bodySubsectionLabelAlign: 'bodySubsectionLabelLeft',
        bodySubsubsectionLabelPos: 'bodySubsubsectionLabelInline',
        bodySubsubsectionLabelAlign: '',
        conclusionOwnPage: true,
        conclusionIncludeLabel: true,
        conclusionSectionLabelAlign: 'conclusionSectionLabelCenter',
        referencesFont: 'Times New Roman',
        referencesFontSize: '12',
        referencesOwnPage: true,
        referencesIncludeLabel: true,
        referencesLabelInput: 'References',
        referencesLabelAlign: 'referencesLabelAlignCenter'
    };

    options = {
        sections: [
            { 
                name: 'general',
                title: 'General',                
                hideUntil: 'none',
                fields: [
                    {
                        name: 'paperTitle',
                        displayName: 'Title of Paper',
                        inputType: 'text',
                        placeholder: 'Enter paper title here...'
                    },
                    {
                        name: 'apaMla',
                        displayName: 'APA or MLA',
                        inputType: 'radio',
                        options: [
                            {
                                name: 'apa',
                                title: 'APA'
                            },
                            {
                                name: 'mla',
                                title: 'MLA'
                            }
                        ]
                    },
                    {
                        name: 'spacing',
                        displayName: 'Spacing',
                        inputType: 'radio',
                        options: [
                            {
                                name: 'singleSpace',
                                title: 'Single'
                            },
                            {
                                name: 'oneAndHalfSpace',
                                title: '1.5'
                            },
                            {
                                name: 'doubleSpace',
                                title: 'Double'
                            }
                        ]
                    },
                    {
                        name: 'toInclude',
                        displayName: 'Include in Paper',
                        inputType: 'checkbox',
                        reorderable: false,
                        options: [
                            {
                                name: 'includeTitle',
                                title: 'Include Title Info'
                            },
                            {
                                name: 'includeHeader',
                                title: 'Include Header'
                            },
                            {
                                name: 'includeAbstractSummary',
                                title: 'Include Abstract/Summary'
                            },
                            {
                                name: 'includeConclusion',
                                title: 'Include Conclusion'
                            },
                            {
                                name: 'includeReferencesWorksCited',
                                title: 'Include References/Works Cited'
                            }
                        ]
                    }
                ]
            },
            { 
                name: 'titleInfo',
                title: 'Title Info',
                hideUntil: 'includeTitle',
                fields: [
                    {
                        name: 'titleInfoFont',
                        displayName: 'Font',
                        inputType: 'fontSelect'
                    },
                    {
                        name: 'titleInfoFontSize',
                        displayName: 'Font Size',
                        inputType: 'fontSizeSelect'
                    },
                    {
                        name: 'titleInfoInclude',
                        displayName: 'Include with Title Info',
                        inputType: 'reorderableCheck',
                        options: [
                            {
                                name: 'titleInfoIncludeTitle',
                                title: 'Include Title',
                                display: 'title',
                                index: 0                            
                            },
                            {
                                name: 'titleInfoIncludeName',
                                title: 'Include Name',
                                display: 'name',
                                index: 1
                            },
                            {
                                name: 'titleInfoIncludeClass',
                                title: 'Include Class',
                                display: 'class',
                                index: 2
                            },
                            {
                                name: 'titleInfoIncludeProfessor',
                                title: 'Include Professor',
                                display: 'professor',
                                index: 3
                            },
                            {
                                name: 'titleInfoIncludeSchool',
                                title: 'Include School',
                                display: 'school',
                                index: 4
                            },
                            {
                                name: 'titleInfoIncludeOtherText',
                                title: 'Include Other Text',
                                display: 'other text',
                                index: 5
                            }
                        ]
                    },
                    {
                        name: 'titleInfoAlign',
                        displayName: 'Alignment',
                        inputType: 'radio',
                        options: [
                            {
                                name: 'titleInfoAlignLeft',
                                title: 'Left'
                            },
                            {
                                name: 'titleInfoAlignCenter',
                                title: 'Center'
                            },
                            {
                                name: 'titleInfoAlignRight',
                                title: 'Right'
                            }
                        ]
                    },
                    {
                        name: 'titleInfoPos',
                        displayName: 'Information Location',
                        inputType: 'radio',
                        options: [
                            {
                                name: 'titleInfoSeparatePage',
                                title: 'Separate Title Page'
                            },
                            {
                                name: 'titleInfoTopFirstPage',
                                title: 'At Top of First Page'
                            }
                        ]
                    }
                ]
            },
            { 
                name: 'header',
                title: 'Header',
                hideUntil: 'includeHeader',
                fields: [    
                    {
                        name: 'headerFont',
                        displayName: 'Font',
                        inputType: 'fontSelect'
                    },
                    {
                        name: 'headerFontSize',
                        displayName: 'Font Size',
                        inputType: 'fontSizeSelect'
                    },                
                    {
                        name: 'headerLeft',
                        displayName: 'Left',
                        inputType: 'radioInput',
                        options: [
                            {
                                name: 'headerLeftPaperTitle',
                                title: 'Paper Title',
                                type: 'text'
                            },
                            {
                                name: 'headerLeftPageNumber',
                                title: 'Page Number',
                                type: 'none'
                            },
                            {
                                name: 'headerLeftOtherText',
                                title: 'Other Text',
                                type: 'text'
                            },
                            {
                                name: 'headerLeftEmpty',
                                title: 'Empty',
                                type: 'none'
                            }
                        ]
                    },
                    {
                        name: 'headerRight',
                        displayName: 'Right',
                        inputType: 'radioInput',
                        options: [
                            {
                                name: 'headerRightPaperTitle',
                                title: 'Paper Title',
                                type: 'text'
                            },
                            {
                                name: 'headerRightPageNumber',
                                title: 'Page Number',
                                type: 'none'
                            },
                            {
                                name: 'headerRightOtherText',
                                title: 'Other Text',
                                type: 'text'
                            },
                            {
                                name: 'headerRightEmpty',
                                title: 'Empty',
                                type: 'none'
                            }
                        ]
                    },
                    {
                        name: 'firstPageConfig',
                        displayName: 'First Page',
                        inputType: 'newSection',
                        fields: [
                            {
                                name: 'headerDifferentFirstPage',
                                displayName: 'Different First Page',
                                inputType: 'toggle'
                            },
                            {
                                name: 'headerUseRunningHeader',
                                displayName: 'Use "Running head:"',
                                inputType: 'toggle',
                                hideUntil: [
                                    'headerDifferentFirstPage'
                                ]
                            },
                            {
                                name: 'headerMoreDifferent',
                                displayName: 'More Differences',
                                inputType: 'toggle',
                                hideUntil: [
                                    'headerDifferentFirstPage'
                                ]
                            },
                            {
                                name: 'headerFirstLeft',
                                displayName: 'First Page Left',
                                inputType: 'radioInput',
                                hideUntil: [
                                    'headerDifferentFirstPage',
                                    'headerMoreDifferent'
                                ],
                                options: [
                                    {
                                        name: 'headerFirstLeftPaperTitle',
                                        title: 'Paper Title',
                                        type: 'text'
                                    },
                                    {
                                        name: 'headerFirstLeftPageNumber',
                                        title: 'Page Number',
                                        type: 'none'
                                    },
                                    {
                                        name: 'headerFirstLeftOtherText',
                                        title: 'Other Text',
                                        type: 'text'
                                    },
                                    {
                                        name: 'headerFirstLeftEmpty',
                                        title: 'Empty',
                                        type: 'none'
                                    }
                                ]
                            },
                            {
                                name: 'headerFirstRight',
                                displayName: 'First Page Right',
                                inputType: 'radioInput',
                                hideUntil: [
                                    'headerDifferentFirstPage',
                                    'headerMoreDifferent'
                                ],
                                options: [
                                    {
                                        name: 'headerFirstRightPaperTitle',
                                        title: 'Paper Title',
                                        type: 'text'
                                    },
                                    {
                                        name: 'headerFirstRightPageNumber',
                                        title: 'Page Number',
                                        type: 'none'
                                    },
                                    {
                                        name: 'headerFirstRightOtherText',
                                        title: 'Other Text',
                                        type: 'text'
                                    },
                                    {
                                        name: 'headerFirstRightEmpty',
                                        title: 'Empty',
                                        type: 'none'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: 'summaryAbstract',
                title: 'Summary / Abstract',
                hideUntil: 'includeAbstractSummary',
                fields: [
                    {
                        name: 'summaryOwnPage',
                        optionName: 'On its Own Page',
                        displayName: 'Separate Page',
                        inputType: 'toggle'
                    },
                    {
                        name: 'summaryIncludeSectionLabel',
                        displayName: 'Section Label',
                        optionName: 'Include Section Label',
                        inputType: 'toggle'
                    },
                    {
                        name: 'summarySectionLabelAlign',
                        displayName: 'Section Label Align',
                        inputType: 'radio',
                        hideUntil: 'summaryIncludeSectionLabel',
                        options: [
                            {
                                name: 'summarySectionLabelLeft',
                                title: 'Left'
                            },
                            {
                                name: 'summarySectionLabelCenter',
                                title: 'Center'
                            },
                            {
                                name: 'summarySectionLabelRight',
                                title: 'Right'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'body',
                title: 'Body',
                hideUntil: 'none',
                fields: [
                    {
                        name: 'bodyBetweenSections',
                        displayName: 'Between Sections',
                        inputType: 'radio',
                        options: [
                            {
                                name: 'bodyBlankLineBetweenSections',
                                title: 'Blank Line Between Each Section'
                            },
                            {
                                name: 'bodyEachSectionOwnPage',
                                title: 'Each Section On Its Own Page'
                            },
                            {
                                name: 'bodyNoSpaceBetweenSections',
                                title: 'No Space Between Sections'
                            }
                        ]
                    },
                    {
                        name: 'bodyLabels',
                        displayName: 'Include Labels',
                        inputType: 'checkbox',
                        reorderable: false,
                        options: [
                            {
                                name: 'bodyIncludeSectionLabels',
                                title: 'Include Section Labels'
                            },
                            {
                                name: 'bodyIncludeSubsectionLabels',
                                title: 'Include Subsection Labels'
                            },
                            {
                                name: 'bodyIncludeSubsubsectionLabels',
                                title: 'Include Subsubsection Labels'
                            }
                        ]
                    },
                    {
                        name: 'bodySectionLabelPos',
                        displayName: 'Section Label Position',
                        inputType: 'radio',
                        hideUntil: 'bodyIncludeSectionLabels',
                        options: [
                            {
                                name: 'bodySectionLabelInline',
                                title: 'Inline with the First Paragraph'
                            },
                            {
                                name: 'bodySectionLabelOwnLine',
                                title: 'On Line Before First Paragraph'
                            }
                        ]
                    },
                    {
                        name: 'bodySubsectionLabelPos',
                        displayName: 'Subsection Label Position',
                        inputType: 'radio',
                        hideUntil: 'bodyIncludeSubsectionLabels',
                        options: [
                            {
                                name: 'bodySubsectionLabelInline',
                                title: 'Inline with the First Paragraph'
                            },
                            {
                                name: 'bodySubsectionLabelOwnLine',
                                title: 'On Line Before First Paragraph'
                            }
                        ]
                    },
                    {
                        name: 'bodySubsubsectionLabelPos',
                        displayName: 'Subsubsection Label Position',
                        inputType: 'radio',
                        hideUntil: 'bodyIncludeSubsubsectionLabels',
                        options: [
                            {
                                name: 'bodySubsubsectionLabelInline',
                                title: 'Inline with the First Paragraph'
                            },
                            {
                                name: 'bodySubsubsectionLabelOwnLine',
                                title: 'On Line Before First Paragraph'
                            }
                        ]
                    },
                    {
                        name: 'bodySectionLabelAlign',
                        displayName: 'Section Label Align',
                        inputType: 'radio',
                        hideUntil: 'bodyIncludeSectionLabels',
                        options: [
                            {
                                name: 'bodySectionLabelLeft',
                                title: 'Left'
                            },
                            {
                                name: 'bodySectionLabelCenter',
                                title: 'Center'
                            },
                            {
                                name: 'bodySectionLabelRight',
                                title: 'Right'
                            }
                        ]
                    },
                    {
                        name: 'bodySubsectionLabelAlign',
                        displayName: 'Subsection Label Align',
                        inputType: 'radio',
                        hideUntil: 'bodyIncludeSubsectionLabels',
                        options: [
                            {
                                name: 'bodySubsectionLabelLeft',
                                title: 'Left'
                            },
                            {
                                name: 'bodySubsectionLabelCenter',
                                title: 'Center'
                            },
                            {
                                name: 'bodySubsectionLabelRight',
                                title: 'Right'
                            }
                        ]
                    },
                    {
                        name: 'bodySubsubsectionLabelAlign',
                        displayName: 'Subsubsection Label Align',
                        inputType: 'radio',
                        hideUntil: 'bodyIncludeSubsubsectionLabels',
                        options: [
                            {
                                name: 'bodySubsubsectionLabelLeft',
                                title: 'Left'
                            },
                            {
                                name: 'bodySubsubsectionLabelCenter',
                                title: 'Center'
                            },
                            {
                                name: 'bodySubsubsectionLabelRight',
                                title: 'Right'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'conclusion',
                title: 'Conclusion',
                hideUntil: 'includeConclusion',
                fields: [
                    {
                        name: 'conclusionOwnPage',
                        displayName: 'Separate Page',
                        optionName: 'On its Own Page',
                        inputType: 'toggle'
                    },
                    {
                        name: 'conclusionIncludeLabel',
                        displayName: 'Section Label',
                        optionName: 'Include Section Label',
                        inputType: 'toggle'
                    },
                    {
                        name: 'conclusionSectionLabelAlign',
                        displayName: 'Section Label Align',
                        inputType: 'radio',
                        hideUntil: 'conclusionIncludeLabel',
                        options: [
                            {
                                name: 'conclusionSectionLabelLeft',
                                title: 'Left'
                            },
                            {
                                name: 'conclusionSectionLabelCenter',
                                title: 'Center'
                            },
                            {
                                name: 'conclusionSectionLabelRight',
                                title: 'Right'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'referencesWorksCited',
                title: 'References / Works Cited',
                hideUntil: 'includeReferencesWorksCited',
                fields: [
                    {
                        name: 'referencesFont',
                        displayName: 'Font',
                        inputType: 'fontSelect'
                    },
                    {
                        name: 'referencesFontSize',
                        displayName: 'Font Size',
                        inputType: 'fontSizeSelect'
                    },
                    {
                        name: 'referencesOwnPage',
                        displayName: 'Separate Page',
                        optionName: 'On its Own Page',
                        inputType: 'toggle'
                    },
                    {
                        name: 'referencesIncludeLabel',
                        displayName: 'Section Label',
                        optionName: 'Include Section Label',
                        inputType: 'toggleInput',
                        options: [
                            {
                                title: 'Include Section Label',
                                placeholder: 'Enter Section Label here...',
                                type: 'text'
                            }
                        ]
                    },
                    {
                        name: 'referencesLabelAlign',
                        displayName: 'Align References Section Label',
                        inputType: 'radio',
                        hideUntil: 'referencesIncludeLabel',
                        options: [
                            {
                                name: 'referencesLabelAlignLeft',
                                title: 'Left'
                            },
                            {
                                name: 'referencesLabelAlignCenter',
                                title: 'Center'
                            },
                            {
                                name: 'referencesLabelAlignRight',
                                title: 'Right'
                            }
                        ]
                    }
                ]
            }
        ]
    }
}